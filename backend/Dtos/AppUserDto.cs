using TechConsult.Api.Entities;

namespace TechConsult.Api.Dtos;

public record AppUserDto(
    int Id,
    string Email,
    AppUserRole Role,
    DateTimeOffset CreatedAt,
    DateTimeOffset? LastLoginAt
);
