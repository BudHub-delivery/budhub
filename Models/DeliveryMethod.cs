using System.ComponentModel.DataAnnotations;

namespace Budhub.Models;
public enum DeliveryMethodType
{
    PICKUP,
    DELIVERY
}

public class DeliveryMethod : BaseEntity
{
    [Required]
    public DeliveryMethodType DeliveryMethodType { get; set; }

    //Associations
    public List<Delivery> Deliveries { get; set; } = new();
    public List<Order> Orders { get; set; } = new();
}