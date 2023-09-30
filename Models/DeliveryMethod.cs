using System.ComponentModel.DataAnnotations;
using Budhub.Enums;

namespace Budhub.Models;

public class DeliveryMethod : BaseEntity
{
    [Required]
    public DeliveryMethodType DeliveryMethodType { get; set; }

    //Associations
    public List<Delivery> Deliveries { get; set; } = new();
    public List<Order> Orders { get; set; } = new();
}