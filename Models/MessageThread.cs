// #pragma warning disable CS8618
// using System.ComponentModel.DataAnnotations;
// using System.ComponentModel.DataAnnotations.Schema;
// namespace Budhub.Models;
// public class MessageThread : BaseEntity
// {
//     //Foreign Keys
//     public int OrderId { get; set; }
//     public int AuthorId { get; set; }
//     public int RecipientId { get; set; }

//     // Navigation Properties
//     public User? Author { get; set; }
//     public User? Recipient { get; set; }
//     //Associations
//     public List<Message> Messages { get; set; } = new();
// }

/*
    TODO: 
    Discuss Message logic, I wonder if we can just have message exist in relation to orders.
    So instead of User having messages AND Order having messages etc, an order would simply have messages attached directly, 
    which could logically create a "thread" for that model without the need for a MessageThread.

    The user would have these messages through the order table, which it would have access to already.
*/