#pragma warning disable CS8618
namespace Budhub.Models;


public class RefreshToken : BaseEntity
{
    public string Value { get; set; }
    public DateTime ExpiryDate { get; set; } = DateTime.UtcNow.AddDays(30);

    //Foreign Keys
    public int UserId { get; set; }
    //Navigation Properties
    public User? User { get; set; }
}