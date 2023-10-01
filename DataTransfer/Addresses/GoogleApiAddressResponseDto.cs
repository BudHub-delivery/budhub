#pragma warning disable CS8618
using Budhub.Enums;
using Budhub.Models;
using Budhub.DataTransfer.Addresses;


namespace Budhub.DataTransfer.Addresses;
public class GoogleApiAddressResponseDto
{
    public string? AddressLine1 { get; set; }
    public string? DeliveryNotes { get; set; }
    public string? City { get; set; }
    public StateCode? State { get; set; }
    public string? Zip { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
    
    public GoogleApiAddressResponseDto(AddressComponentDto components, GoogleResponse response)
    {
        AddressLine1 = $"{components?.StreetNumber} {components?.StreetName}";
        City = components?.City;
        State = components?.State;
        Zip = components?.Zip;
        Latitude = response?.Results?[0]?.Geometry?.Location?.Lat ?? default;
        Longitude = response?.Results?[0]?.Geometry?.Location?.Lng ?? default;
    }
}