using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RisagerManagerServer.Models;
using RisagerManagerServer.Services;
using System.Net;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RisagerManagerServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BookingController : ControllerBase
    {
        private readonly RisagerContext _context;
        private readonly BookingService _bookingService;
        private readonly UserManager<User> _userManager;
        public BookingController(RisagerContext context, BookingService bookingService, UserManager<User> userManager) 
        {
            _context = context;
            _bookingService = bookingService;
            _userManager = userManager;
        }
        [HttpGet("{id}")]
        public async Task<Booking?> GetBookingById(int id)
        {
            return await _context.Booking.FirstOrDefaultAsync(x => x.Id.Equals(id));
        }

        [HttpGet()]
        public async Task<IEnumerable<Booking>> GetAllBookings()
        {
            return await _context.Booking.Include(x => x.BookingUser).Include(x => x.House).OrderBy(x => x.Arrival).ToListAsync();
        }

        [HttpPost]
        public async Task<bool> Post(string arrival, string departure, int houseId)
        {
            var arrivaltDate = DateOnly.Parse(arrival.Substring(0,10));
            var departureDate = DateOnly.Parse(departure.Substring(0,10));
            Console.WriteLine(arrival.Substring(0, 10) + " " + departureDate);
            if (await _bookingService.DoesTimeRangeOverlap(arrivaltDate, departureDate)) throw new Exception("unable");

            await _context.Booking.AddAsync(new Booking
            {
                Arrival = arrivaltDate,
                Departure = departureDate,
                BookingUser = await _userManager.GetUserAsync(User),
                House = await _context.House.FirstOrDefaultAsync(x => x.Id.Equals(houseId))
        });
            await _context.SaveChangesAsync();

            return true;
        }
        [HttpDelete]
        public async Task Delete(string bookingId)
        {
            var bookingToDelete = await _context.Booking.FirstOrDefaultAsync(x => x.Id.Equals(int.Parse(bookingId)));
            _context.Booking.Remove(bookingToDelete);
            await _context.SaveChangesAsync();
        }
    }
}
