using Budhub.Models;
using Budhub.DataTransfer.Users;

namespace Budhub.Services;
public interface IUserService
{
    Task<UserWithRoleDto?> CreateAsync(User user);
    // Task<UserDto?> DeactivateByIdAsync(int id);
    // Task<UserDto?> GetByIdAsync(int id);
    Task<UserDto?> ValidatePasswordAsync(LoginUser loginUser);
    // Task<UserDto?> UpdatePasswordAsync(PasswordUpdateDTO passUpdate, int userId);
}