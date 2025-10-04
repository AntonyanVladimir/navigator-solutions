namespace TechConsult.Api.Models;

public sealed record AppointmentDto
{
    public int Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public DateTimeOffset ScheduledAt { get; init; }
    public string? ContactEmail { get; init; }
    public string? Notes { get; init; }
}
