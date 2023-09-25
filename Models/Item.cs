#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace Budhub.Models;

public enum ItemTypeEnum
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

public enum StrainTypeEnum
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
    public bool? ContainsThc { get; set; }
    public bool? ContainsCbd { get; set; }
    public double? CbdContent { get; set; }
    public double? ThcContent { get; set; }
    [Required]
    public double Weight { get; set; }
    [Required]
    public double Price { get; set; }
    public ItemTypeEnum? Type { get; set; }
    public StrainTypeEnum? StrainType { get; set; }

    //Associations
    public List<OrderItem> OrderItems { get; set; } = new();
}