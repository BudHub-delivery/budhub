#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Budhub.Models;
public class MessageThread : BaseEntity
{
    //Foreign Keys and Navigation Properties
    public int OrderId { get; set; }
    public int AuthorId { get; set; }
    public int RecipientId { get; set; }

    //Associations
    public User Author { get; set; }
    public User Recipient { get; set; }
    public List<Message> Messages = new();
}