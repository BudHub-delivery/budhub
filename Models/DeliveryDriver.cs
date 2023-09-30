namespace Budhub.Models;
public class DeliveryDriver : BaseEntity
{
    public int UserId { get; set; }
    public User? User { get; set; }

    public List<Delivery> Deliveries { get; set; } = new();
    public List<Order> Orders { get; set; } = new();
}

