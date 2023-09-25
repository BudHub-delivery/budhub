namespace Budhub.Models;

public enum OrderStatusEnum
{
    PENDING,
    ACCEPTED,
    CANCELLED,
    OUT_FOR_DELIVERY,
    DELIVERED,
    READY_FOR_PICKUP,
    PICKED_UP
}

public class OrderStatus : BaseEntity
{
    public OrderStatusEnum OrderStatusState { get; set; }
}