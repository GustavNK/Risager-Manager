using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Reflection.Metadata;

namespace RisagerManagerServer.Models
{
    public class RisagerContext(DbContextOptions<RisagerContext> options) : IdentityDbContext<User>(options)
    {
        public DbSet<User> User { get; set; }
        public DbSet<Booking> Booking { get; set; }
    }
}
