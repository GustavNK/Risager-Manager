using RisagerManagerServer.Models;

namespace RisagerManagerServer.Models;
public static class DbInitializer
{
    public static async Task Initialize(RisagerContext context)
    {
        context.Database.EnsureCreated();

        if (!context.User.Any())
        {
            var users = new User[]
            {
            new User{Id="1", Name="Gustav"},
            new User{Id="2", Name="Elisabeth"}
            };
            await context.User.AddRangeAsync(users);
            context.SaveChanges();
        }
        if (!context.Booking.Any())
        {
            var bookings = new Booking[]
            {
            new Booking{Arrival=new DateOnly(2024,1,1), Departure=new DateOnly(2024,1,10), BookingUser=context.User.First()},
            new Booking{Arrival=new DateOnly(2024,1,20), Departure=new DateOnly(2024,1,26), BookingUser=context.User.First()},
            };
            await context.Booking.AddRangeAsync(bookings);
            context.SaveChanges();
        }
    }
}

