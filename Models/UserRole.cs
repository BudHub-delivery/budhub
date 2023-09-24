#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace Budhub.Models;

public class UserRole : BaseEntity
{
    
    //Foreign Keys 
    public int UserId { get; set; }
    public int RoleId { get; set; }

    //Navigation Properties
    public User User { get; set; }
    public Role Role { get; set; }

}