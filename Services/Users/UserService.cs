using Budhub.DataStorage;
using Budhub.DataTransfer.Users;
using Budhub.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Budhub.Services;
public class UserService : IUserService
{
    private readonly DBContext _context;

    public UserService(DBContext context)
    {
        _context = context;
    }

    public async Task<UserWithRoleDto?> CreateAsync(User user)
    {
        try
        {
            Role role = new(); // RoleType Defaults to USER;
            user.UserRoles.Add(new UserRole { Role = role});

            PasswordHasher<User> hasher = new();
            user.Password = hasher.HashPassword(user, user.Password);
            
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return new UserWithRoleDto(user, role);
        }
        catch (Exception ex)
        {
            //TODO: We will Add logger functionality to log the error instead of just console.
            Console.WriteLine(ex.Message);
            return null;
        }
    }

    public async Task<UserDto?> ValidatePasswordAsync(LoginUser loginUser)
    {
        User? check = await _context.Users.Where(u => u.Email == loginUser.Email).FirstOrDefaultAsync();

        if (check == null) return null;

        PasswordHasher<LoginUser> hasher = new();

        if (hasher.VerifyHashedPassword(loginUser, check.Password, loginUser.Password) == 0)
        {
            return null;
        }
        return new UserDto(check);
    }
}