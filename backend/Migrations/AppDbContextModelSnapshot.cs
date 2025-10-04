using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using TechConsult.Api.Data;

#nullable disable

namespace TechConsult.Api.Migrations;

[DbContext(typeof(AppDbContext))]
partial class AppDbContextModelSnapshot : ModelSnapshot
{
    protected override void BuildModel(ModelBuilder modelBuilder)
    {
#pragma warning disable 612, 618
        modelBuilder
            .HasAnnotation("ProductVersion", "8.0.5")
            .HasAnnotation("Relational:MaxIdentifierLength", 63);

        NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

        modelBuilder.Entity("TechConsult.Api.Entities.Appointment", b =>
        {
            b.Property<int>("Id")
                .HasColumnName("id")
                .HasColumnType("integer")
                .UseIdentityByDefaultColumn();

            b.Property<string>("ContactEmail")
                .HasColumnName("contact_email")
                .HasColumnType("character varying(320)")
                .HasMaxLength(320);

            b.Property<DateTimeOffset>("CreatedAt")
                .HasColumnName("created_at")
                .HasColumnType("timestamp with time zone")
                .HasDefaultValueSql("NOW()")
                .ValueGeneratedOnAdd();

            b.Property<DateTimeOffset>("ScheduledAt")
                .HasColumnName("scheduled_at")
                .HasColumnType("timestamp with time zone");

            b.Property<string>("Notes")
                .HasColumnName("notes")
                .HasColumnType("character varying(2000)")
                .HasMaxLength(2000);

            b.Property<string>("Title")
                .IsRequired()
                .HasColumnName("title")
                .HasColumnType("character varying(200)")
                .HasMaxLength(200);

            b.HasKey("Id");

            b.ToTable("appointments");
        });
#pragma warning restore 612, 618
    }
}
