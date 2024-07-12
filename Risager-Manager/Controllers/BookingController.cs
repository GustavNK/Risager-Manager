using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RisagerManagerServer.Models;
using RisagerManagerServer.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RisagerManagerServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly RisagerContext _context;
        private readonly BookingService _bookingService;
        public BookingController(RisagerContext context, BookingService bookingService) 
        {
            _context = context;
            _bookingService = bookingService;
        }
        [HttpGet("{id}")]
        public async Task<Booking?> GetBookingById(int id)
        {
            return await _context.Booking.FirstOrDefaultAsync(x => x.Id.Equals(id));
        }

        [HttpGet()]
        public async Task<IEnumerable<Booking>> GetAllBookings()
        {
            return await _context.Booking.Include(x => x.BookingUser).OrderBy(x => x.Arrival).ToListAsync();
        }

        [HttpPost]
        public async Task<bool> Post(string arrival, string departure, int userId)
        {
            var arrivaltDate = DateOnly.Parse(arrival.Substring(0,10));
            var departureDate = DateOnly.Parse(departure.Substring(0,10));
            Console.WriteLine(arrival.Substring(0, 10) + " " + departureDate);
            if (await _bookingService.DoesTimeRangeOverlap(arrivaltDate, departureDate)) return false;

            await _context.Booking.AddAsync(new Booking
            {
                Arrival = arrivaltDate,
                Departure = departureDate,
                BookingUser = await _context.User.FirstOrDefaultAsync(x => x.Id == userId.ToString()),
            });
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
