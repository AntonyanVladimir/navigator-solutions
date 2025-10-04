using System.ComponentModel.DataAnnotations;

namespace TechConsult.Api.Dtos;

public sealed class CreateAppointmentRequest
{
    [Required]
    [StringLength(200)]
    public string Title { get; init; } = string.Empty;

    [Required]
    public DateTimeOffset ScheduledAt { get; init; }

    [EmailAddress]
    public string? ContactEmail { get; init; }

    [StringLength(2000)]
    public string? Notes { get; init; }
}
