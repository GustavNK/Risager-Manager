using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace RisagerManagerServer.Models
{
    public class User : IdentityUser
    {
        public ICollection<Booking> Bookings { get; set; }
    }
}
