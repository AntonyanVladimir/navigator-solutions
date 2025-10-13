using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

namespace TechConsult.Api.Data;

public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

        var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL")
                               ?? "Server=localhost;Port=3306;Database=techconsult;User=techconsult;Password=techconsult;";

        var serverVersion = new MySqlServerVersion(new Version(8, 0, 36));

        optionsBuilder.UseMySql(connectionString, serverVersion);

        return new AppDbContext(optionsBuilder.Options);
    }
}
