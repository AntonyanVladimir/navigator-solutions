using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TechConsult.Api.Data;
using TechConsult.Api.Dtos;
using TechConsult.Api.Entities;
using TechConsult.Api.Mappers;

namespace TechConsult.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IPasswordHasher<AppUser> _passwordHasher;
    private readonly ILogger<AuthController> _logger;

    public AuthController(AppDbContext db, IPasswordHasher<AppUser> passwordHasher, ILogger<AuthController> logger)
    {
        _db = db;
        _passwordHasher = passwordHasher;
        _logger = logger;
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<AppUserDto>> GetByIdAsync(int id, CancellationToken cancellationToken)
    {
        var user = await _db.AppUsers.AsNoTracking().FirstOrDefaultAsync(u => u.Id == id, cancellationToken);

        return user is null ? NotFound() : Ok(user.ToDto());
    }

    [HttpPost("register")]
    public async Task<ActionResult<AppUserDto>> RegisterAsync([FromBody] RegisterUserRequest request, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        var normalizedEmail = request.Email.Trim().ToLowerInvariant();

        var exists = await _db.AppUsers.AnyAsync(u => u.Email == normalizedEmail, cancellationToken);
        if (exists)
        {
            ModelState.AddModelError(nameof(request.Email), "A user with this email already exists.");
            return ValidationProblem(ModelState);
        }

        var user = new AppUser
        {
            Email = normalizedEmail,
            Role = request.Role
        };

        user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);

        await _db.AppUsers.AddAsync(user, cancellationToken);
        await _db.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("New user registered with id {UserId}", user.Id);

        return CreatedAtAction(nameof(GetByIdAsync), new { id = user.Id }, user.ToDto());
    }

    [HttpPost("login")]
    public async Task<ActionResult<AppUserDto>> LoginAsync([FromBody] LoginRequest request, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        var normalizedEmail = request.Email.Trim().ToLowerInvariant();
        var user = await _db.AppUsers.FirstOrDefaultAsync(u => u.Email == normalizedEmail, cancellationToken);

        if (user is null)
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        var verification = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);

        if (verification == PasswordVerificationResult.Failed)
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        user.LastLoginAt = DateTimeOffset.UtcNow;
        await _db.SaveChangesAsync(cancellationToken);

        return Ok(user.ToDto());
    }
}
