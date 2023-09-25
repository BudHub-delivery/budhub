using System.ComponentModel.DataAnnotations;

namespace Budhub.Models;

public enum DeliveryStatusEnum 
{
  DELIVERED,
  IN_TRANSIT,
  PENDING,
  CANCELLED,
  PICKED_UP,
  READY_FOR_PICKUP
}

public class DeliveryStatus : BaseEntity
{
    [Required]
    public DeliveryStatusEnum Status { get; set; }

    //Associations
    public List<Delivery> Deliveries { get; set; } = new();
}