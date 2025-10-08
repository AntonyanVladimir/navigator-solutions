using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TechConsult.Api.Migrations
{
    /// <inheritdoc />
    public partial class changeTypeOfDuration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Duration",
                table: "appointments");

            migrationBuilder.AddColumn<int>(
                name: "DurationInMinutes",
                table: "appointments",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DurationInMinutes",
                table: "appointments");

            migrationBuilder.AddColumn<TimeSpan>(
                name: "Duration",
                table: "appointments",
                type: "time(6)",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));
        }
    }
}
