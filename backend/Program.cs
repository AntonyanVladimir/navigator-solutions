using System.Text.Json.Serialization;
using TechConsult.Api.Data;
using Npgsql;

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
    throw new InvalidOperationException("A PostgreSQL connection string was not provided. Set ConnectionStrings__Default or DATABASE_URL.");
}

var connectionString = new NpgsqlConnectionStringBuilder(rawConnectionString)
{
    // Ensure pooling is enabled for efficiency
    Pooling = true,
}.ConnectionString;

builder.Services.AddSingleton(_ =>
{
    var dataSourceBuilder = new NpgsqlDataSourceBuilder(connectionString);
    return dataSourceBuilder.Build();
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

await DatabaseInitializer.InitialiseAsync(app.Services, app.Lifetime.ApplicationStopping);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.MapGet("/health", () => Results.Ok(new { status = "Healthy" }));
app.MapControllers();

app.Run();
