#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace Budhub.Models;

public enum PaymentStatuses
{
    PENDING,
    SUCCESSFUL,
    DECLINED,
    REFUNDED

}

public class PaymentStatus : BaseEntity
{
    public PaymentStatuses PaymentStatusType { get; set; }

    //Foreign Keys
    public int OrderId { get; set; }

    //Navigation Properties
    public List<Order> Orders { get; set; }
}