namespace Budhub.Models;

public class OrderItem : BaseEntity
{
    //Foreign Keys
    public int ItemId { get; set; }
    public int OrderId { get; set; }

    //Navigation Properties
    public Order? Order { get; set; }
    public Item? Item { get; set; }
}