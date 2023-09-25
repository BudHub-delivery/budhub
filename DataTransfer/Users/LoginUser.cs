#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
using Budhub.Models;

namespace Budhub.DataTransfer.Users;
public class LoginUser
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; } 
}