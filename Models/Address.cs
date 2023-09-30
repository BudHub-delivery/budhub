#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
using Budhub.Enums;

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
    public StateCode State { get; set; }
    [MinLength(5)]
    public string Zip { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }

    //Made these FK's nullable because a company address might not have a user and so on
    public int? UserId { get; set; } 
    public User? User { get; set; }

    public int? StoreId { get; set; }
    public Store? Store { get; set; }

    public int? CompanyId { get; set; }
    public Company? Company { get; set; }

    //IEnumerables
    public List<BillingAddress> BillingAddresses { get; set; } = new();
    public List<DeliveryAddress> DeliveryAddresses { get; set; } = new();
    public List<Order> Orders { get; set; } = new();
}