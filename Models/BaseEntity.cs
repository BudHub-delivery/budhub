#pragma warning disable CS8618
namespace Budhub.Models;

public class BaseEntity
{
    [Key]
    public int Id { get; set; }
    
    public bool IsActive { get; set; } = true;

    public DateTime CreatedAt {get; set;} = DateTime.UtcNow;
    public DateTime UpdatedAt{get; set;} = DateTime.UtcNow;
    public DateTime? DeletedAt{get; set;} = null;
}