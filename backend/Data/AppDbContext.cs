using Microsoft.EntityFrameworkCore;
using TechConsult.Api.Entities;

namespace TechConsult.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Appointment> Appointments => Set<Appointment>();
    public DbSet<AppUser> AppUsers => Set<AppUser>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Appointment>(entity =>
        {
            entity.ToTable("appointments");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id)
                .HasColumnName("id");
            entity.Property(e => e.Title)
                .IsRequired()
                .HasColumnName("title")
                .HasMaxLength(200);
            entity.Property(e => e.CallerFirstName)
                .IsRequired()
                .HasColumnName("caller_first_name")
                .HasMaxLength(100);
            entity.Property(e => e.CallerLastName)
                .IsRequired()
                .HasColumnName("caller_last_name")
                .HasMaxLength(100);
            entity.Property(e => e.ScheduledAt)
                .HasColumnName("scheduled_at")
                .HasColumnType("datetime(6)");
            entity.Property(e => e.DurationInMinutes)
                .HasColumnName("duration_in_minutes");
            entity.Property(e => e.Type)
                .HasColumnName("appointment_type")
                .HasConversion<int>();
            entity.Property(e => e.ContactEmail)
                .HasColumnName("contact_email")
                .IsRequired()
                .HasMaxLength(320);
            entity.Property(e => e.Notes)
                .HasColumnName("notes")
                .HasMaxLength(2000);
            entity.Property(e => e.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("datetime(6)")
                .HasDefaultValueSql("CURRENT_TIMESTAMP(6)")
                .ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<AppUser>(entity =>
        {
            entity.ToTable("app_users");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id)
                .HasColumnName("id");
            entity.HasIndex(e => e.Email)
                .IsUnique();
            entity.Property(e => e.Email)
                .HasColumnName("email")
                .IsRequired()
                .HasMaxLength(320);
            entity.Property(e => e.PasswordHash)
                .HasColumnName("password_hash")
                .IsRequired()
                .HasMaxLength(500);
            entity.Property(e => e.Role)
                .HasColumnName("role")
                .HasConversion<int>();
            entity.Property(e => e.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("datetime(6)")
                .HasDefaultValueSql("CURRENT_TIMESTAMP(6)")
                .ValueGeneratedOnAdd();
            entity.Property(e => e.LastLoginAt)
                .HasColumnName("last_login_at")
                .HasColumnType("datetime(6)");
        });
    }
}
