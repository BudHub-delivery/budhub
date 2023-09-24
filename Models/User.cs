#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Budhub.Models;
public class User : BaseEntity
{
    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }

    [Required]
    [EmailAddress]
    [Index(IsUnique = true)]
    public string Email { get; set; }

    [Required]
    [StrongPassword]
    public string Password { get; set; }

    public bool EmailConfirmed { get; set; }
    
    [NotMapped]
    [Compare("Password")]
    public string Confirm { get; set; }

    //Foreign Keys and Navigation Properties

    //Associations
    public List<Address> Addresses = new();
    public List<BillingAddress> BillingAddresses = new();
    public List<DeliveryAddress> DeliveryAddresses = new();
    public List<Message> AuthorMessages = new();
    public List<Message> RecievedMessages = new();
    public List<MessageThread> MessageThreads = new();
    public List<Order> Orders = new();
    public List<PaymentMethod> PaymentMethods = new();
    public List<StoreRole> StoreRoles = new();
    public List<UserRole> UserRoles = new();

    public DeliveryDriver? DeliveryDriver { get; set; }
    public RefreshToken? RefreshToken { get; set; }
}