#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace Budhub.Models;

public enum OrderStatus
{
    PENDING
    ACCEPTED
    CANCELLED
    OUT_FOR_DELIVERY
    DELIVERED
    READY_FOR_PICKUP
    PICKED_UP
}

public class OrderStatus : BaseEntity
{
    public OrderStatus OrderStatus { get; set; }

    //Foreign Keys
    public int OrderId { get; set; }

    //Navigation Properties
    public Order Order { get; set; }
}