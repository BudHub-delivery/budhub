#pragma warning disable CS8618
using Budhub.Models;

namespace Budhub.DataTransfer;
public class UserDto
{
    public int UserId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt {get; set;} = DateTime.UtcNow;
    public DateTime UpdatedAt{get; set;} = DateTime.UtcNow;

    public UserDto(User user)
    {
        UserId = user.UserId;
        FirstName = user.FirstName;
        LastName = user.LastName;
        Email = user.Email;
        IsActive = user.IsActive;
        CreatedAt = user.CreatedAt;
        UpdatedAt = user.UpdatedAt;
    }
}