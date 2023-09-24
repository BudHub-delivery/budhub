#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace Budhub.Models;
public class OrderItem
{
    [Key]
    public int OrderItemId { get; set; }

    //Associations
    public int OrderId { get; set; }
    public Order? Order { get; set; }

    public int ItemId { get; set; }
    public Item? Item { get; set; }
}