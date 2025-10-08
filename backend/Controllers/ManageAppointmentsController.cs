using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TechConsult.Api.Data;
using TechConsult.Api.Dtos;
using TechConsult.Api.Entities;
using TechConsult.Api.Mappers;

namespace TechConsult.Api.Controllers;

[ApiController]
[Route("api/manage-appointments")]
public class ManageAppointmentsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ManageAppointmentsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppointmentDto>>> GetAllAsync(CancellationToken cancellationToken)
    {
        var appointments = await _db.Appointments
            .AsNoTracking()
            .OrderBy(a => a.ScheduledAt)
            .Select(a => a.ToDto())
            .ToListAsync(cancellationToken);

        return Ok(appointments);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<AppointmentDto>> GetByIdAsync(int id, CancellationToken cancellationToken)
    {
        var appointment = await _db.Appointments
            .AsNoTracking()
            .Where(a => a.Id == id)
            .Select(a => a.ToDto())
            .FirstOrDefaultAsync(cancellationToken);

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

        var appointment = new Appointment
        {
            Title = request.Title,
            ScheduledAt = request.ScheduledAt,
            ContactEmail = request.ContactEmail,
            Notes = request.Notes,
            DurationInMinutes = request.Duration
        };

        await _db.Appointments.AddAsync(appointment, cancellationToken);
        await _db.SaveChangesAsync(cancellationToken);

        return Created($"/api/manage-appointments/{appointment.Id}", appointment.ToDto());
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteAsync(int id, CancellationToken cancellationToken)
    {
        var entity = await _db.Appointments.FirstOrDefaultAsync(a => a.Id == id, cancellationToken);

        if (entity is null)
        {
            return NotFound();
        }

        _db.Appointments.Remove(entity);
        await _db.SaveChangesAsync(cancellationToken);

        return NoContent();
    }
}
