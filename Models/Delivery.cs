// model Delivery {
//   id                  Int               @id @default(autoincrement())
//   orderId             Int               @unique
//   order               Order             @relation(fields: [orderId], references: [id])
//   deliveryDriverId    Int
//   deliveryDriver      DeliveryDriver    @relation(fields: [deliveryDriverId], references: [id])
//   deliveryMethodId    Int
//   deliveryMethod      DeliveryMethod    @relation(fields: [deliveryMethodId], references: [id])
//   deliveryStatusId    Int
//   deliveryStatus      DeliveryStatus    @relation(fields: [deliveryStatusId], references: [id])
// }

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