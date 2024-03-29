#pragma warning disable 8618
using System.ComponentModel.DataAnnotations;

namespace Budhub.Models;
public class DeliveryPolygon : BaseEntity
{
    [Required]
    public string PolygonJson { get; set; }

    public int StoreId { get; set; }
    public Store? Store { get; set; }
}