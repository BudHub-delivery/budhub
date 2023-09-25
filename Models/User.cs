#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Budhub.Attributes;
using MyApp.CustomAnnotations;


namespace Budhub.Models;
public class User : BaseEntity
{
    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }

    [Required]
    [EmailAddress]
    [UniqueEmail]
    public string Email { get; set; }

    [StrongPassword]
    public string Password { get; set; }
    
    [NotMapped]
    [Compare("Password", ErrorMessage = "Passwords did not match.")]
    public string Confirm { get; set; }

    public bool EmailConfirmed { get; set; } = false;

    //Foreign Keys and Navigation Properties
    public DeliveryDriver? DeliveryDriver { get; set; }

    //Associations
    public List<Address> Addresses { get; set; } = new();
    public List<BillingAddress> BillingAddresses { get; set; } = new();
    public List<DeliveryAddress> DeliveryAddresses { get; set; } = new();
    public List<Order> Orders = new();
    public List<PaymentMethod> PaymentMethods { get; set; } = new();
    public List<StoreRole> StoreRoles { get; set; } = new();
    public List<UserRole> UserRoles { get; set; } = new();
    public List<RefreshToken> RefreshTokens { get; set; } = new();
}
