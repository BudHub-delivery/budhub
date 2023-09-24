#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace Budhub.Models;


public class RefreshToken : BaseEntity
{
    public string value { get; set; }
    public DateTime ExpiryDate { get; set; }

    //Foreign Keys
    public int UserId { get; set; }

    //Navigation Properties
    public User User { get; set; }
}