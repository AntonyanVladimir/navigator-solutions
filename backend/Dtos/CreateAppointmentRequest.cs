using System.ComponentModel.DataAnnotations;
using TechConsult.Api.Entities;

namespace TechConsult.Api.Dtos;

public sealed class CreateAppointmentRequest
{
    [Required]
    [StringLength(200)]
    public string Title { get; init; } = string.Empty;

    [Required]
    public DateTimeOffset ScheduledAt { get; init; }

    [Required]
    [StringLength(100)]
    public string CallerFirstName { get; init; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string CallerLastName { get; init; } = string.Empty;

    [EnumDataType(typeof(AppointmentType))]
    public AppointmentType Type { get; init; } = AppointmentType.AiConsulting;

    [Required]
    [EmailAddress]
    [StringLength(320)]
    public string ContactEmail { get; init; } = string.Empty;

    [StringLength(2000)]
    public string? Notes { get; init; }
    
    [Range(0, 1440)]
    public int Duration { get; init; }
}
