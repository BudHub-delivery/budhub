#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
using Budhub.Enums;
namespace Budhub.Models;


public class Item : BaseEntity
{
    [Required]
    public string ItemName { get; set; }
    [Required]
    [MinLength(8)]
    public string ItemDesc { get; set; }
    [Required]
    public string BrandName { get; set; }
    public bool? ContainsThc { get; set; }
    public bool? ContainsCbd { get; set; }
    public double? CbdContent { get; set; }
    public double? ThcContent { get; set; }
    public ItemType? Type { get; set; }
    public Strain? Strain { get; set; }

    //Foreign keys
    public int StoreId {get;set;}
    
    //Navigation properties
    public Store? Store {get;set;}
    public List<ItemWeightPrice> ItemWeightPrice {get;set;} = new();
    public List<OrderItem> OrderItems { get; set; } = new();
}