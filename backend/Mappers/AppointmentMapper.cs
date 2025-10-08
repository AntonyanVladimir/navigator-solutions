using TechConsult.Api.Dtos;
using TechConsult.Api.Entities;

namespace TechConsult.Api.Mappers;

public static class AppointmentMapper
{
    public static AppointmentDto ToDto(this Appointment entity) => new()
    {
        Id = entity.Id,
        Title = entity.Title,
        ScheduledAt = entity.ScheduledAt,
        ContactEmail = entity.ContactEmail,
        Notes = entity.Notes,
        DurationInMinutes = entity.DurationInMinutes,
    };
}
