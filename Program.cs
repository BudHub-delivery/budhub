using System.Text;
using Budhub.DataStorage;
using Budhub.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("appsettings.Secrets.json", optional: true, reloadOnChange: true);

string? connectionString = builder.Configuration["ConnectionStrings:LocalConnection"];

builder.Services.AddControllers();

builder.Services.AddDbContext<DBContext>(options =>
{
	options.UseNpgsql(connectionString);
});

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IAddressService, AddressService>();
builder.Services.AddScoped<ITokenService, TokenService>();

string? encKey = builder.Configuration["Jwt:SecretKey"];

if (string.IsNullOrEmpty(encKey) || encKey.Length < 16)
{
    throw new InvalidOperationException("Jwt Secret is Invalid or Missing.");
}

byte[] key = Encoding.ASCII.GetBytes(encKey);

builder.Services.AddAuthentication(options =>
{
	options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
	.AddJwtBearer("Bearer", options =>
	{
 
		options.RequireHttpsMetadata = true;
		options.SaveToken = false;
		options.TokenValidationParameters = new TokenValidationParameters
		{
			ValidateIssuerSigningKey = true,
			IssuerSigningKey = new SymmetricSecurityKey(key),
			ValidateIssuer = true,
			ValidateAudience = true,
			ValidateLifetime = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
			ClockSkew = TimeSpan.Zero
		};
	}
);

var app = builder.Build();

// if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
// {
//     app.UseDeveloperExceptionPage();
// }

app.UseRouting();

app.UseAuthentication();

app.MapControllers();

app.Run();
