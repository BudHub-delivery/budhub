#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace Budhub.Models;

public class Store : BaseEntity
{
    
    public double TaxRate { get; set; }

    //Foreign Keys and 
    public int StoreId { get; set; }

    //Navigation Properties
    public Store Store { get; set; }

    //Associations
    List<Order> Orders { get; set; }
}