namespace RisagerManagerServer.Models
{
    public class House
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageSrc { get; set; }
        public int NumberOfBeds { get; set; }
        public IEnumerable<Booking> Bookings { get; set; }
    }
}
