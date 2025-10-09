namespace TechConsult.Api.Entities;

public class Appointment
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public DateTimeOffset ScheduledAt { get; set; }
    public int DurationInMinutes { get; set; }
    public string CallerFirstName { get; set; } = string.Empty;
    public string CallerLastName { get; set; } = string.Empty;
    public AppointmentType Type { get; set; } = AppointmentType.AiConsulting;
    public string ContactEmail { get; set; } = string.Empty;
    public string? Notes { get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}
