using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RisagerManagerServer.Models;

namespace RisagerManagerServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class HouseController : ControllerBase
    {
        private readonly RisagerContext _context;

        public HouseController(RisagerContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<House>> Get()
        {
            return await _context.House.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<House?> Get(int id)
        {
            return await _context.House.FirstOrDefaultAsync(x => x.Id.Equals(id));
        }
    }
}
