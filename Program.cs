using Budhub.DataStorage;
using Budhub.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("appsettings.Secrets.json", optional: true, reloadOnChange: true);

var connectionString = builder.Configuration["ConnectionStrings:LocalConnection"];

builder.Services.AddControllers();

builder.Services.AddDbContext<DBContext>(options =>
{
	options.UseNpgsql(connectionString);
});

builder.Services.AddScoped<IUserService, UserService>();

var app = builder.Build();

app.UseAuthorization();

app.MapControllers();

app.Run();
