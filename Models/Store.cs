#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace Budhub.Models;

public class Store : BaseEntity
{
    public string Name { get; set; }
    public string OperatingHours { get; set; }
    public string PhoneNumber { get; set; }


    //Foreign Keys
    public int AddressId { get; set; }
    public int CompanyId { get; set; } 
    public int DeliveryPolygonId { get; set; }
    public int StoreTaxId { get; set; }

    //Navigation Properties
    // public Address Address { get; set; }
    // public Company? Company { get; set; }
    // public DeliveryPolygon? DeliveryPolygon { get; set; }
    public List<StoreTax> StoreTaxes { get; set; }


    //Associations
    public List<Item> Items { get; set; }
    public List<Order> Orders { get; set; }
    public List<StoreRole> StoreRoles { get; set; }
    
}