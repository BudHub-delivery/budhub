#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
using Budhub.Enums;
namespace Budhub.Models;

public class Role : BaseEntity
{
    [Required]
    public RoleType RoleType { get; set; } = RoleType.USER;

    //Associations
    public List<UserRole> UserRoles { get; set; }
    public List<StoreRole> StoreRoles { get; set; }
}