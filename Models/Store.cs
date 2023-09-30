#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace Budhub.Models;

public class Store : BaseEntity
{
    [Required]
    public string Name { get; set; }
    [Required]
    public string OperatingHours { get; set; }
    [Required]
    public string PhoneNumber { get; set; }

    // Foreign keys
    public int CompanyId { get; set; } 

    public Company? Company { get; set; }
    public DeliveryPolygon? DeliveryPolygon { get; set; }
    public Address? Address { get; set; }
    public StoreTax? StoreTax { get; set; }

    //Associations
    public List<Item> Items { get; set; }
    public List<Order> Orders { get; set; }
    public List<StoreRole> StoreRoles { get; set; }
}