using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Reflection.Metadata;

namespace RisagerManagerServer.Models
{
    public class RisagerContext : DbContext
    {
        public RisagerContext(DbContextOptions<RisagerContext> options) : base(options)
        {
        }
        public DbSet<User> User { get; set; }
        public DbSet<Booking> Booking { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User");
        }
    }
}
