using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> Get() 
        {
            return null;
        }
    }
}
