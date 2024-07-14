using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace RisagerManagerServer.Migrations
{
    /// <inheritdoc />
    public partial class CreateHouseModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HouseId",
                table: "Booking",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "House",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    ImageSrc = table.Column<string>(type: "text", nullable: false),
                    NumberOfBeds = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_House", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Booking_HouseId",
                table: "Booking",
                column: "HouseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Booking_House_HouseId",
                table: "Booking",
                column: "HouseId",
                principalTable: "House",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Booking_House_HouseId",
                table: "Booking");

            migrationBuilder.DropTable(
                name: "House");

            migrationBuilder.DropIndex(
                name: "IX_Booking_HouseId",
                table: "Booking");

            migrationBuilder.DropColumn(
                name: "HouseId",
                table: "Booking");
        }
    }
}
