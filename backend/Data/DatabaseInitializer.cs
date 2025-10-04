using Microsoft.Extensions.DependencyInjection;
using Npgsql;

namespace TechConsult.Api.Data;

public static class DatabaseInitializer
{
    private const string CreateAppointmentsTableSql = @"
        CREATE TABLE IF NOT EXISTS appointments (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            scheduled_at TIMESTAMPTZ NOT NULL,
            contact_email TEXT NULL,
            notes TEXT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
    ";

    public static async Task InitialiseAsync(IServiceProvider services, CancellationToken cancellationToken)
    {
        await using var scope = services.CreateAsyncScope();
        var dataSource = scope.ServiceProvider.GetRequiredService<NpgsqlDataSource>();
        await using var connection = await dataSource.OpenConnectionAsync(cancellationToken);
        await using var command = connection.CreateCommand();
        command.CommandText = CreateAppointmentsTableSql;
        await command.ExecuteNonQueryAsync(cancellationToken);
    }
}
