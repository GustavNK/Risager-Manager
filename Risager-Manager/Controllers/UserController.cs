using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    [HttpGet(nameof(GetUser))]
    public async Task<User?> GetUser(string id)
    {
        return await _context.User.FirstOrDefaultAsync(x => x.Id.Equals(id));
    }
    [Authorize]
    [HttpGet(nameof(GetCurrentUser))]
    public async Task<User?> GetCurrentUser()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) { return null; }
        return await _context.Users.FirstOrDefaultAsync(x => x.Id.Equals(userId));
    }
    [Authorize]
    [HttpGet(nameof(GetAllUser))]
    public async Task<IEnumerable<User>> GetAllUser()
    {
        return await _context.Users.ToListAsync();
    }
    [Authorize]
    [HttpPost(nameof(SetUsername))]
    public async Task SetUsername(string email, string newUsername)
    {
        var currentUser = await _userManager.FindByEmailAsync(email);
        var contextUser = await _context.User.FirstAsync(x => x.Email.Equals(currentUser.Email));
        contextUser.UserName = newUsername;
        _context.SaveChanges();
    }
    [Authorize]
    [HttpPost(nameof(Logout))]
    public async Task Logout()
    {
        this.Response.Cookies.Delete(".AspNetCore.Identity.Application", new CookieOptions { Secure = true });
    }
    [Authorize]
    [HttpDelete(nameof(DeleteUser))]
    public async Task DeleteUser(string userId)
    {
        var userToDelte = await _context.User.FirstOrDefaultAsync(x => x.Id.Equals(userId));
        _context.User.Remove(userToDelte);
        _context.SaveChanges();
    }
    [AllowAnonymous]
    [HttpGet(nameof(IsAuthenticated))]
    public bool IsAuthenticated()
    {
        return User.Identity.IsAuthenticated;
    }

}

