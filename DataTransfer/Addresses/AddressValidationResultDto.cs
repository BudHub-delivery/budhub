#pragma warning disable CS8618
using Budhub.Enums;
using Budhub.Models;
using Budhub.DataTransfer.Addresses;

namespace Budhub.DataTransfer.Addresses;
public class AddressValidationResultDto
{
    public string? AddressLine1 { get; set; }
    public string? AddressLine2 { get; set; }
    public string? DeliveryNotes { get; set; }
    public string? City { get; set; }
    public StateCode? State { get; set; }
    public string? Zip { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
    
    public AddressValidationResultDto(
        GoogleApiAddressResponseDto googleApiAddressResponse, 
        string? addressLine2,
        string? deliveryNotes
        )
    {

        AddressLine1 = googleApiAddressResponse.AddressLine1;
        AddressLine2 = addressLine2;
        DeliveryNotes = deliveryNotes;
        City = googleApiAddressResponse.City;
        State = googleApiAddressResponse.State;
        Zip = googleApiAddressResponse.Zip;
        Latitude = googleApiAddressResponse.Latitude;
        Longitude = googleApiAddressResponse.Longitude;

    }
}