#pragma warning disable 8618

namespace Budhub.Models;
public class Company : BaseEntity
{
    public string Name { get; set; }
    public string? Description { get; set; }
    
    //Associations
    public int AddressId { get; set; }
    public Address Address { get; set; }

    // public List<Store> Stores { get; set; } = new();
}