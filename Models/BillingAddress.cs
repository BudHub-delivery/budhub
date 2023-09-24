#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;

namespace Budhub.Models;
public class BillingAddress : BaseEntity
{
    public int UserId { get; set; }
    public User? User { get; set; }

    public int AddressId { get; set; }
    public Address? Address { get; set; }

    public int PaymentMethodId { get; set; }
    // public PaymentMethod? PaymentMethod { get; set; }
}