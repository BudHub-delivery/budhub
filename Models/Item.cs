#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace Budhub.Models;

enum ItemType
{
    PACKAGED_FLOWER,
    BULK_FLOWER,
    EDIBLE,
    CONCENTRATE,
    CATRIDGE,
    VAPORIZER,
    TOPICAL,
    PREROLL,
    ACCESSORY,
    OTHER
}

enum StrainType
{
    INDICA,
    SATIVA,
    HYBRID,
    CBD,
    OTHER
}

public class Item : BaseEntity
{
    [Required]
    public string ItemName { get; set; }
    
    [Required]
    [MinLength(8)]
    public string ItemDesc { get; set; }

    [Required]
    public string BrandName { get; set; }
    public bool ContainsThc { get; set; }
    public bool ContainsCbd { get; set; }
    public double CbdContent { get; set; }
    public double ThcContent { get; set; }
    public double Weight { get; set; }
    public double Price { get; set; }
    //TODO: make an enums directory and make this adhere to an enum.
    public ItemType Type { get; set; }
    //TODO: make an enums directory and make this adhere to an enum.
    public StrainType StrainType { get; set; }

    //Associations
    public List<OrderItem> OrderItems { get; set; }
}