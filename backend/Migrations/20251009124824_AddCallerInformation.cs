using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TechConsult.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddCallerInformation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DurationInMinutes",
                table: "appointments",
                newName: "duration_in_minutes");

            migrationBuilder.UpdateData(
                table: "appointments",
                keyColumn: "contact_email",
                keyValue: null,
                column: "contact_email",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "contact_email",
                table: "appointments",
                type: "varchar(320)",
                maxLength: 320,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(320)",
                oldMaxLength: 320,
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "appointment_type",
                table: "appointments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "caller_first_name",
                table: "appointments",
                type: "varchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "caller_last_name",
                table: "appointments",
                type: "varchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "appointment_type",
                table: "appointments");

            migrationBuilder.DropColumn(
                name: "caller_first_name",
                table: "appointments");

            migrationBuilder.DropColumn(
                name: "caller_last_name",
                table: "appointments");

            migrationBuilder.RenameColumn(
                name: "duration_in_minutes",
                table: "appointments",
                newName: "DurationInMinutes");

            migrationBuilder.AlterColumn<string>(
                name: "contact_email",
                table: "appointments",
                type: "varchar(320)",
                maxLength: 320,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(320)",
                oldMaxLength: 320)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }
    }
}
