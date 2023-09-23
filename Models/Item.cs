#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace Budhub.Models;
public class Item : BaseEntity
{
    [Key]
    public int ItemId { get; set; }
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
    public int Type { get; set; }
    //TODO: make an enums directory and make this adhere to an enum.
    public int StrainType { get; set; }

    //Associations
    public List<OrderItem> OrderItems { get; set; }
}