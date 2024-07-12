using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using RisagerManagerServer.Models;

namespace RisagerManagerServer.Services
{
    public class BookingService
    {
        private readonly RisagerContext _context;
        public BookingService(RisagerContext context) 
        {
            _context = context;
        }
        public async Task<bool> DoesTimeRangeOverlap(DateOnly newArrivalTime, DateOnly newDepartureTime)
        {
            return await _context.Booking
                .AnyAsync(e => e.Arrival < newDepartureTime && e.Departure > newArrivalTime);
        }
    }
}
