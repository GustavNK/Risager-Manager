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
        public DbSet<House> House { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().HasMany((b) => b.Bookings).WithOne(x => x.BookingUser).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<House>().HasMany((b) => b.Bookings).WithOne(x => x.House).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
