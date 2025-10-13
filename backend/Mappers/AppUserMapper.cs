using TechConsult.Api.Dtos;
using TechConsult.Api.Entities;

namespace TechConsult.Api.Mappers;

public static class AppUserMapper
{
    public static AppUserDto ToDto(this AppUser user) =>
        new(user.Id, user.Email, user.Role, user.CreatedAt, user.LastLoginAt);
}
