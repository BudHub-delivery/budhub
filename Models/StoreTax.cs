#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace Budhub.Models;

public class StoreTax : BaseEntity
{
    [Required]
    public double TaxRate { get; set; }

    //Foreign Keys
    public int StoreId { get; set; }

    //Navigation Properties
    public Store? Store { get; set; }
    public List<Order> Orders { get; set; } = new();
}