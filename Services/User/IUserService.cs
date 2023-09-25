using Budhub.DataTransfer;
using Budhub.Models;

namespace Budhub.Services;
public interface IUserService
{
    Task<UserWithRoleDto?> CreateAsync(User user);
}