#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace Budhub.Models;

public enum RolesTypeEnum
{
    ADMIN,
    USER,
    DRIVER,
    STORE_ADMIN,
    STORE_EMPLOYEE
}


public class Role : BaseEntity
{
    [Required]
    public RolesTypeEnum RoleType { get; set; } = RolesTypeEnum.USER;

    //Associations
    public List<UserRole> UserRoles { get; set; }
    public List<StoreRole> StoreRoles { get; set; }
    
}