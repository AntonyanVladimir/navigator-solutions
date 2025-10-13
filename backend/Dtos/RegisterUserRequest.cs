using System.ComponentModel.DataAnnotations;
using TechConsult.Api.Entities;

namespace TechConsult.Api.Dtos;

public class RegisterUserRequest
{
    [Required, EmailAddress, MaxLength(320)]
    public string Email { get; set; } = string.Empty;

    [Required, MinLength(8), MaxLength(100)]
    public string Password { get; set; } = string.Empty;

    public AppUserRole Role { get; set; } = AppUserRole.RegularUser;
}
