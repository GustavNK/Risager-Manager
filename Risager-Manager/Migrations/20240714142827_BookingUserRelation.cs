﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RisagerManagerServer.Migrations
{
    /// <inheritdoc />
    public partial class BookingUserRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Booking_AspNetUsers_BookingUserId",
                table: "Booking");

            migrationBuilder.AlterColumn<string>(
                name: "BookingUserId",
                table: "Booking",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Booking_AspNetUsers_BookingUserId",
                table: "Booking",
                column: "BookingUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Booking_AspNetUsers_BookingUserId",
                table: "Booking");

            migrationBuilder.AlterColumn<string>(
                name: "BookingUserId",
                table: "Booking",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddForeignKey(
                name: "FK_Booking_AspNetUsers_BookingUserId",
                table: "Booking",
                column: "BookingUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
