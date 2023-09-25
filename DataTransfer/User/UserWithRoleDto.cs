#pragma warning disable CS8618
using Budhub.Models;

namespace Budhub.DataTransfer;
public class UserWithRoleDto
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt {get; set;} = DateTime.UtcNow;
    public DateTime UpdatedAt{get; set;} = DateTime.UtcNow;

    public RolesTypeEnum Role { get; set; }

    public UserWithRoleDto(User user, Role role)
    {
        Id = user.Id;
        FirstName = user.FirstName;
        LastName = user.LastName;
        Email = user.Email;
        IsActive = user.IsActive;
        CreatedAt = user.CreatedAt;
        UpdatedAt = user.UpdatedAt;

        Role = role.RoleType;
    }
}