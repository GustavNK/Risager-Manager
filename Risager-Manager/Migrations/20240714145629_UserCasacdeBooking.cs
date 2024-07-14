using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RisagerManagerServer.Migrations
{
    /// <inheritdoc />
    public partial class UserCasacdeBooking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Booking_AspNetUsers_BookingUserId",
                table: "Booking");

            migrationBuilder.AddForeignKey(
                name: "FK_Booking_AspNetUsers_BookingUserId",
                table: "Booking",
                column: "BookingUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Booking_AspNetUsers_BookingUserId",
                table: "Booking");

            migrationBuilder.AddForeignKey(
                name: "FK_Booking_AspNetUsers_BookingUserId",
                table: "Booking",
                column: "BookingUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
