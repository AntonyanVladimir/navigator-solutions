using Microsoft.EntityFrameworkCore;
using TechConsult.Api.Entities;

namespace TechConsult.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Appointment> Appointments => Set<Appointment>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Appointment>(entity =>
        {
            entity.ToTable("appointments");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Title).IsRequired().HasColumnName("title").HasMaxLength(200);
            entity.Property(e => e.ScheduledAt)
                .HasColumnName("scheduled_at")
                .HasColumnType("timestamp with time zone");
            entity.Property(e => e.ContactEmail).HasColumnName("contact_email").HasMaxLength(320);
            entity.Property(e => e.Notes).HasColumnName("notes").HasMaxLength(2000);
            entity.Property(e => e.CreatedAt)
                .HasColumnName("created_at")
                .HasDefaultValueSql("NOW()")
                .HasColumnType("timestamp with time zone")
                .ValueGeneratedOnAdd();
        });
    }
}
