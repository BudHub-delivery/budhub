#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
using Budhub.Enums;

namespace Budhub.Models;
public class Order : BaseEntity
{
    public double DeliveryFee { get; set; }
    public double DeliveryTip { get; set; }
    public double OrderTotal { get; set; }
    public FulfillmentMethod FulfillmentMethod { get; set; } = FulfillmentMethod.Delivery;
    public OrderStatus OrderStatus { get; set; } =OrderStatus.PENDING;
    public PaymentStatus PaymentStatus {get;set;} = PaymentStatus.PENDING;

    //TODO: Is requested time needed if we have CreatedAt?
    public DateTime RequestedTime { get; set; } = DateTime.UtcNow;

    //Foreign Keys 
    public int UserId { get; set; }
    public int StoreId { get; set; }
    public int AddressId { get; set; }
    public int DeliveryDriverId { get; set; }
    public int StoreTaxId { get; set; }


    //Navigation Properties
    public User? User { get; set; }
    public Store? Store { get; set; }
    public Address? Address { get; set; }
    public DeliveryDriver? DeliveryDriver { get; set; }
    public StoreTax? StoreTax { get; set; }

    public List<OrderItem> OrderItems { get; set; } = new();
}