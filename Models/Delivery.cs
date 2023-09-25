#pragma warning disable 8618
namespace Budhub.Models;
public class Delivery : BaseEntity
{
    public int OrderId { get; set; }
    public Order? Order { get; set; }

    public int DeliveryDriverId { get; set; }
    public DeliveryDriver? DeliveryDriver { get; set; }

    public int DeliveryStatusId { get; set; }
    public DeliveryStatus? DeliveryStatus { get; set; }
}