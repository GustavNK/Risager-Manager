using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RisagerManagerServer.Models;
using System.Security.Claims;

namespace RisagerManagerServer.Controllers;
[Route("api/[controller]")]
[ApiController]
public class UserController : Controller
{
    public readonly UserManager<User> _userManager;
    private readonly RisagerContext _context;
    public UserController(RisagerContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    [HttpGet(nameof(GetUser))]
    public async Task<User?> GetUser(string id)
    {
        return await _context.User.FirstOrDefaultAsync(x => x.Id.Equals(id));
    }
    [HttpGet(nameof(GetCurrentUser))]
    public async Task<User?> GetCurrentUser()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) { return null; }
        return await _context.Users.FirstOrDefaultAsync(x => x.Id.Equals(userId));
    }
    [HttpGet(nameof(GetAllUser))]
    public async Task<IEnumerable<User>> GetAllUser()
    {
        return await _context.Users.ToListAsync();
    }
    [HttpPost(nameof(SetUsername))]
    public async Task SetUsername(string email, string newUsername)
    {
        var currentUser = await _userManager.FindByEmailAsync(email);
        var contextUser = await _context.User.FirstAsync(x => x.Email.Equals(currentUser.Email));
        contextUser.UserName = newUsername;
        _context.SaveChanges();
    }
        
    [HttpPost(nameof(Logout))]
    public async Task Logout()
    {
        this.Response.Cookies.Delete(".AspNetCore.Identity.Application", new CookieOptions { Secure = true });
    }
    [HttpDelete(nameof(DeleteUser))]
    public async Task DeleteUser(string userId)
    {
        var userToDelte = await _context.User.FirstOrDefaultAsync(x => x.Id.Equals(userId));
        _context.User.Remove(userToDelte);
        _context.SaveChanges();
    }
}

