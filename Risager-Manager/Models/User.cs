using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Net.Sockets;

namespace RisagerManagerServer.Models
{
    public class User : IdentityUser
    {
        public ICollection<Booking> Bookings { get; set; }
    }
}
