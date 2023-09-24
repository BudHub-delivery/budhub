#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Budhub.Models;
public class Message : BaseEntity
{
    [Required]
    public string MessageBody { get; set; }
    [Required]
    public string MessageReadStatus { get; set; }

    //Foreign Keys and Navigation Properties
    public int MessageThreadId { get; set; }
    public int RecipientId { get; set; }
    public int AuthorId { get; set; }

    //Associations
    public MessageThread MessageThread { get; set; }
    public User Recipient { get; set; }
    public User Author { get; set; }

    public List<Order> Orders = new();
}