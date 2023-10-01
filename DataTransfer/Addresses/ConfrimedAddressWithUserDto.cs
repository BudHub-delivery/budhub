// #pragma warning disable CS8618
// using Budhub.Enums;
// using Budhub.Models;
// using Budhub.DataTransfer.Addresses;

// namespace Budhub.DataTransfer.Addresses;
// public class ConfirmedAddressWithUserDto
// {
//     public string? UserId { get; set; }
//     public string? AddressLine1 { get; set; }
//     public string? AddressLine2 { get; set; }
//     public string? DeliveryNotes { get; set; }
//     public string? City { get; set; }
//     public StateCode? State { get; set; }
//     public string? Zip { get; set; }
//     public double? Latitude { get; set; }
//     public double? Longitude { get; set; }
//     public DateTime CreatedAt {get; set;} = DateTime.UtcNow;
//     public DateTime UpdatedAt{get; set;} = DateTime.UtcNow;

//     public ConfirmedAddressWithUserDto(User user, Address address)
//     {

//         UserId = user.Id;
//         AddressLine1 = address.AddressLine1;
//         AddressLine2 = address.AddressLine2;
//         DeliveryNotes = address.DeliveryNotes;
//         City = address.City;
//         State = address.State;
//         Zip = address.Zip;
//         Latitude = address.Latitude;
//         Longitude = address.Longitude;
//         CreatedAt = address.CreatedAt;
//         UpdatedAt = address.UpdatedAt;

//     }
// }