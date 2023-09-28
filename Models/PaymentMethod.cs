namespace Budhub.Models;


public class PaymentMethod : BaseEntity
{
    //Foreign Keys
    public int OrderId { get; set; }
    public int BillingAddressId { get; set; }

    //Navigation Properties
    public Order? Order { get; set; }
    public BillingAddress? BillingAddress { get; set; }
}