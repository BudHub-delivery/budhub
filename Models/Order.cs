#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace Budhub.Models;
public class Order : BaseEntity
{
    [Key]
    public int OrderId { get; set; }
    public double DeliveryFee { get; set; }
    public double DeliveryTip { get; set; }
    public double OrderTotal { get; set; }
    //TODO: Is requested time needed if we have CreatedAt?
    public DateTime RequestedTime { get; set; } = DateTime.UtcNow;

    //Associations
    public int UserId { get; set; }
    public User? User { get; set; }

    public List<OrderItem> OrderItems { get; set; }
}