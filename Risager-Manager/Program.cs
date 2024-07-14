using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RisagerManagerServer.Extensions;
using RisagerManagerServer.Models;
using RisagerManagerServer.Services;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(x =>
   x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<RisagerContext>(options =>
    options.UseNpgsql("Host=localhost;Database=risager;Username=RisagerAdmin;Password=123") //builder.Configuration.GetConnectionString("RisagerSqlServerConnectionString"))
);
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost");
            policy.AllowAnyHeader();
            policy.AllowAnyMethod();
            policy.AllowCredentials();
        });
});

// Auth
builder.Services.AddAuthentication(IdentityConstants.ApplicationScheme)
    .AddIdentityCookies();
builder.Services.AddAuthorizationBuilder();
builder.Services.AddIdentityCore<User>()
    .AddEntityFrameworkStores<RisagerContext>()
    .AddApiEndpoints();

builder.Services.AddScoped<BookingService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    });
}

app.UseCors();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.MapGroup("auth").MapCustomIdentityApi<User>();

// Seed Db if empty
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = scope.ServiceProvider.GetRequiredService<RisagerContext>();
        await DbInitializer.Initialize(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred seeding the DB.");
    }
}

app.Run();
