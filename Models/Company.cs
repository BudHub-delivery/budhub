#pragma warning disable 8618

namespace Budhub.Models;
public class Company : BaseEntity
{
    public string Name { get; set; }
    public string? Description { get; set; }
    
    //Navigation Properties
    public Address? Address { get; set; }
    //IEnumerables
    public List<Store> Stores { get; set; } = new();
}