    using TechConsult.Api.Models;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace TechConsult.Api.Controllers;

[ApiController]
[Route("api/manage-appointments")]
public class ManageAppointmentsController : ControllerBase
{
    private readonly NpgsqlDataSource _dataSource;

    public ManageAppointmentsController(NpgsqlDataSource dataSource)
    {
        _dataSource = dataSource;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppointmentDto>>> GetAllAsync(CancellationToken cancellationToken)
    {
        const string sql = @"
            SELECT id, title, scheduled_at AS ScheduledAt, contact_email AS ContactEmail, notes
            FROM appointments
            ORDER BY scheduled_at ASC;";

        await using var connection = await _dataSource.OpenConnectionAsync(cancellationToken);
        var appointments = await connection.QueryAsync<AppointmentDto>(new CommandDefinition(sql, cancellationToken: cancellationToken));
        return Ok(appointments);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<AppointmentDto>> GetByIdAsync(int id, CancellationToken cancellationToken)
    {
        const string sql = @"
            SELECT id, title, scheduled_at AS ScheduledAt, contact_email AS ContactEmail, notes
            FROM appointments
            WHERE id = @Id;";

        await using var connection = await _dataSource.OpenConnectionAsync(cancellationToken);
        var appointment = await connection.QuerySingleOrDefaultAsync<AppointmentDto>(new CommandDefinition(sql, new { Id = id }, cancellationToken: cancellationToken));

        return appointment is null ? NotFound() : Ok(appointment);
    }

    [HttpPost]
    public async Task<ActionResult<AppointmentDto>> CreateAsync([FromBody] CreateAppointmentRequest request, CancellationToken cancellationToken)
    {
        if (request.ScheduledAt <= DateTimeOffset.UtcNow)
        {
            ModelState.AddModelError(nameof(request.ScheduledAt), "Scheduled time must be in the future.");
            return ValidationProblem(ModelState);
        }

        const string sql = @"
            INSERT INTO appointments (title, scheduled_at, contact_email, notes)
            VALUES (@Title, @ScheduledAt, @ContactEmail, @Notes)
            RETURNING id, title, scheduled_at AS ScheduledAt, contact_email AS ContactEmail, notes;";

        await using var connection = await _dataSource.OpenConnectionAsync(cancellationToken);
        var newAppointment = await connection.QuerySingleAsync<AppointmentDto>(new CommandDefinition(sql, request, cancellationToken: cancellationToken));
        return Created($"/api/manage-appointments/{newAppointment.Id}", newAppointment);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteAsync(int id, CancellationToken cancellationToken)
    {
        const string sql = "DELETE FROM appointments WHERE id = @Id";
        await using var connection = await _dataSource.OpenConnectionAsync(cancellationToken);
        var affected = await connection.ExecuteAsync(new CommandDefinition(sql, new { Id = id }, cancellationToken: cancellationToken));
        return affected == 0 ? NotFound() : NoContent();
    }
}
