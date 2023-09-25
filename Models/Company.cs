#pragma warning disable 8618

namespace Budhub.Models;
public class Company : BaseEntity
{
    public string Name { get; set; }
    public string? Description { get; set; }
    
    //Foreign Keys
    public int AddressId { get; set; }
    // Navigation Properties
    public Address? Address { get; set; }
    //Associations
    public List<Store> Stores { get; set; } = new();
}