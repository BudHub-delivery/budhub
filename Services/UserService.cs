using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Budhub.Models;
using Budhub.Services;

namespace Budhub.Services
{
  public class UserServices
  {
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;
    private readonly JwtAuthService _jwtAuthService;
    private readonly MailerService _mailerService;
    private readonly PasswordHasher<User> _passwordHasher;
  }

  public UserServices(
    AppDbContext context, 
    IConfiguration config, 
    JwtAuthService jwtAuthService, 
    MailerService mailerService,
    PasswordHasher<User> passwordHasher
    )
  {
    _context = context;
    _config = config;
    _jwtAuthService = jwtAuthService;
    _mailerService = mailerService;
    _passwordHasher = new PasswordHasher<User>();
  }

  public async Task<User> CreateUser(CreateUserPayload payload, RoleType? roleType = null)
  {
    var passwordValidator = new StrongPasswordAttribute();
    passwordValidator.IsValid(payload.Password);

    var emailValidator = EmailAddressAttribute();
    if(!emailValidator.IsValid(payload.Email))
    {
      throw new Exception("Invalid email address");
    }

    roleType ??= RoleType.USER;

    var user = new User
    {
      FirstName = payload.FirstName,
      LastName = payload.LastName,
      Email = payload.Email,
      Password = _passwordHasher.HashPassword(null, password),
  
      UserRoles = new List<UserRole>
      {
        new UserRole { RoleId = (int)roleType }
      }
    };

    try
    {
      _context.Users.Add(user);
      await _context.SaveChangesAsync();
    }

    catch(DbUpdateException ex)
    {
      // Check for unqiue constraint violation
      if(ex.InnerException?.Message.Contains("UNIQUE KEY constraint") ?? false)
      {
        throw new Exception("Email address already registered");
      }

      throw new Exception("Unknown error: UserServices at CreateUser method");
    } 

    await SendResetConfirmEmail(user, "userInvitation");

    return user;
    
  }

  private bool VerifyPassword(string password, string hashedPassword)
  {
    var result = _passwordHasher.VerifyHashedPassword(null, hashedPassword, password)
    return result == PasswordVerificationResult.Success;
  }
}