namespace TechConsult.Api.Dtos;

public sealed record AppointmentDto
{
    public int Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public DateTimeOffset ScheduledAt { get; init; }
    public string? ContactEmail { get; init; }
    public string? Notes { get; init; }
    public int DurationInMinutes { get; init; } // Duration in minutes
}
