// #pragma warning disable CS8618
// using System.ComponentModel.DataAnnotations;
// using System.ComponentModel.DataAnnotations.Schema;
// namespace Budhub.Models;
// public class Message : BaseEntity
// {
//     [Required]
//     public string MessageBody { get; set; }
//     [Required]
//     public string MessageReadStatus { get; set; }

//     //Foreign Keys and Navigation Properties
//     public int MessageThreadId { get; set; }
//     public int RecipientId { get; set; }
//     public int AuthorId { get; set; }

//     //Associations
//     public MessageThread MessageThread { get; set; }
//     public User Recipient { get; set; }
//     public User Author { get; set; }

//     public List<Order> Orders = new();
// }

/*
    TODO: 
    Discuss Message logic, I wonder if we can just have message exist in relation to orders.
    So instead of User having messages AND Order having messages etc, an order would simply have messages attached directly, 
    which could logically create a "thread" for that model without the need for a MessageThread.

    The user would have these messages through the order table, which it would have access to already.
*/
