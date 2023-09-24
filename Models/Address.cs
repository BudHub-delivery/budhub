#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;

namespace Budhub.Models;
public class Address : BaseEntity
{
    [Required]
    public string AddressLine1 { get; set; }
    public string? AddressLine2 { get; set; }
    public string? DeliveryNotes { get; set; }
    [Required]
    public string City { get; set; }
    [Required]
    public string State { get; set; } //TODO: Make this an enum that adheres to state codes.
    [MinLength(5)]
    public string Zip { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }

    //========= Associations ===========
    public int UserId { get; set; }
    public User? User { get; set; }

    public int StoreId { get; set; }
    // public Store? Store { get; set; }

    public int CompanyId { get; set; }
    // public Company? Company { get; set; }

    public List<BillingAddress> BillingAddresses { get; set; } = new();
    // public List<DeliveryAddress> DeliveryAddresses { get; set; } = new();
    public List<Order> Orders { get; set; } = new();
}