#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace Budhub.Models;

public enum RolesTypes
{
    ADMIN,
    USER,
    DRIVER,
    STORE_ADMIN,
    STORE_EMPLOYEE
}


public class Role : BaseEntity
{
    public RolesTypes Role { get; set; }

    //Associations
    public List<UserRole> UserRoles { get; set; }
    public List<StoreRole> StoreRoles { get; set; }
    
}