namespace TechConsult.Api.Entities;

public enum AppUserRole
{
    Admin = 1,
    RegularUser = 2
}

public class AppUser
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public AppUserRole Role { get; set; } = AppUserRole.RegularUser;
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? LastLoginAt { get; set; }
}
