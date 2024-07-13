using System.ComponentModel.DataAnnotations.Schema;

namespace RisagerManagerServer.Models
{
    public class Booking
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public DateOnly Arrival {  get; set; }
        public DateOnly Departure { get; set; }
        public User BookingUser { get; set; }
    }
}
