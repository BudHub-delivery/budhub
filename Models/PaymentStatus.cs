namespace Budhub.Models;

public enum PaymentStatusEnum
{
    PENDING,
    SUCCESSFUL,
    DECLINED,
    REFUNDED

}

public class PaymentStatus : BaseEntity
{
    public PaymentStatusEnum PaymentStatusType { get; set; }

    //Navigation Properties
    public List<Order> Orders { get; set; } = new();
}