using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RisagerManagerServer.Models;

namespace RisagerManagerServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly RisagerContext _context;
        public UserController(RisagerContext context)
        {
            _context = context;
        }

        [HttpGet(nameof(GetUser))]
        public async Task<User?> GetUser(string id)
        {
            return await _context.User.FirstOrDefaultAsync(x => x.Id.Equals(id));
        }
    }
}
