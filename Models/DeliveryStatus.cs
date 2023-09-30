// using System.ComponentModel.DataAnnotations;
// using Budhub.Enums;

// namespace Budhub.Models;

// public class DeliveryStatus : BaseEntity
// {
//     [Required]
//     public DeliveryStatusType Status { get; set; }

//     //Associations
//     public List<Delivery> Deliveries { get; set; } = new();
// }

//TODO:I propose we get rid of this class and just have a DeliveryStatus enum on the delivery object.