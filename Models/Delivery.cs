#pragma warning disable 8618
using Budhub.Enums;

namespace Budhub.Models;
public class Delivery : BaseEntity
{

    public DeliveryStatus Status { get;set;}
    public int OrderId { get; set; }
    public Order? Order { get; set; }

    public int DeliveryDriverId { get; set; }
    public DeliveryDriver? DeliveryDriver { get; set; }
}