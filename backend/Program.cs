using System.Text.Json.Serialization;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using TechConsult.Api.Data;
using TechConsult.Api.Entities;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var rawConnectionString = builder.Configuration.GetConnectionString("Default")
                          ?? builder.Configuration["ConnectionStrings__Default"]
                          ?? builder.Configuration["DATABASE_URL"]
                          ?? builder.Configuration["VITE_DATABASE_URL"];

if (string.IsNullOrWhiteSpace(rawConnectionString))
{
    throw new InvalidOperationException("A MySQL connection string was not provided. Set ConnectionStrings__Default or DATABASE_URL.");
}

var configuredServerVersion = builder.Configuration["MYSQL_SERVER_VERSION"];
ServerVersion serverVersion;

if (!string.IsNullOrWhiteSpace(configuredServerVersion))
{
    serverVersion = ServerVersion.Parse(configuredServerVersion);
}
else
{
    serverVersion = new MySqlServerVersion(new Version(8, 0, 36));
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(rawConnectionString, serverVersion));

builder.Services.AddScoped<IPasswordHasher<AppUser>, PasswordHasher<AppUser>>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

await using (var scope = app.Services.CreateAsyncScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    var pendingMigrations = (await context.Database.GetPendingMigrationsAsync()).ToList();

    if (pendingMigrations.Count > 0)
    {
        logger.LogInformation("Applying {Count} pending migrations: {Migrations}", pendingMigrations.Count, string.Join(", ", pendingMigrations));
        await context.Database.MigrateAsync();
        logger.LogInformation("Database migrations applied successfully.");
    }
    else
    {
        logger.LogInformation("Database is up to date; no migrations to apply.");
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.MapGet("/health", () => Results.Ok(new { status = "Healthy" }));
app.MapControllers();

app.Run();
