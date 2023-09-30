namespace Budhub.Models;

public class StoreRole : BaseEntity
{
    
    //Foreign Keys
    public int UserId { get; set; }
    public int StoreId { get; set; }
    public int RoleId { get; set; }

    //Navigation Properties
    public User? User { get; set; }
    public Store? Store { get; set; }
    public Role? Role { get; set; }
}