#pragma warning disable CS8618
namespace Budhub.Models;
public class BaseEntity
{
    public bool IsActive { get; set; } = true;

    public DateTime CreatedAt {get; set;} = DateTime.UtcNow;
    public DateTime UpdatedAt{get; set;} = DateTime.UtcNow;
}