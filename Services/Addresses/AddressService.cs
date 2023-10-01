using Budhub.DataStorage;
using Budhub.DataTransfer.Addresses;
using Budhub.Models;
using Budhub.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Web;
using System.Net.Http;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Budhub.Services;
public class AddressService : IAddressService
{

    private readonly DBContext _context;
    private readonly IConfiguration _config;

    public AddressService(DBContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    // public async Task<ValidatedAddressDto?> ConfirmAndSaveAddressAsync(Address address)
    // {
    //     //Check if the address is valid.

    //     try
    //     {
    //        //TODO: Set Delivery Address as default address for user.
    //         user.Addresses.Add(address);
    //         await _context.SaveChangesAsync();

    //         return new ValidatedAddressDto(user, address);
    //     }
    //     catch (Exception ex)
    //     {
    //         //TODO: We will Add logger functionality to log the error instead of just console.
    //         Console.WriteLine(ex.Message);
    //         return null;
    //     }
    // }

    /// <summary>
    /// Validates an address using Google's geocoding service.
    /// </summary>
    /// <param name="address">The address to validate.</param>
    /// <returns>A DTO containing the validation result, or null if the validation fails.</returns>
    public async Task<AddressValidationResultDto?> ValidateAddressAsync(Address address)
    {
        //TODO: Implement this method.
        string addressToValidate = string.Join(", ", 
            new string[] 
            {
                address.AddressLine1,
                address.City,
                address.State.ToString(),
                address.Zip
            }
        );

        GoogleResponse? googleResponse = await GetEncodedAddressDataAsync(addressToValidate);

        if (googleResponse == null)
        {
            Console.WriteLine("Google API returned an error.");
            return null;
        }

        GoogleApiAddressResponseDto? googleApiAddressResponse = HandleGoogleResponseAsync(googleResponse);

        if (googleApiAddressResponse != null)
        {
            AddressValidationResultDto? addressValidationResult = new AddressValidationResultDto(
                googleApiAddressResponse, 
                address.AddressLine2,
                address.DeliveryNotes
            );

            return addressValidationResult;
        }
        
        throw new Exception("Error in Validating Address.");
    }

    /// <summary>
    /// Sends a request to Google's geocoding service to fetch data for a given address.
    /// </summary>
    /// <param name="addressToValidate">The address string to get data for.</param>
    /// <returns>A GoogleResponse object containing the geocoding data, or null if the request fails.</returns>
    public async Task<GoogleResponse?> GetEncodedAddressDataAsync(string addressToValidate)
    {
        using HttpClient client = new HttpClient();

        // Encode the address
        string encodedAddress = HttpUtility.UrlEncode(addressToValidate);
        string? googleApiKey = _config["GoogleApi:Key"];

        // Construct the URL
        string url = $"https://maps.googleapis.com/maps/api/geocode/json?address={encodedAddress}&key={googleApiKey}";

        // Set up the GET request with necessary headers
        HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, url);
        request.Headers.Add("Accept", "application/json");
        // request.Headers.Add("Content-Type", "application/json");

        try
        {
            HttpResponseMessage response = await client.SendAsync(request);
            // Assuming you want the response content as a string, you can retrieve it as follows:
            string responseData = await response.Content.ReadAsStringAsync();
            GoogleResponse? googleResponse = JsonConvert.DeserializeObject<GoogleResponse>(responseData);
            return googleResponse;
        }
        catch (HttpRequestException ex)
        {
            Console.WriteLine(ex.Message);
            return null;
        }
        catch (JsonException ex)
        {
            Console.WriteLine(ex.Message);
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return null;
        }

    }

    /// <summary>
    /// Handles the response from Google's geocoding service.
    /// </summary>
    /// <param name="googleResponse">The response data from Google's geocoding service.</param>
    /// <returns>A DTO containing the parsed address details, or throws an exception if an error occurs.</returns>
    public GoogleApiAddressResponseDto? HandleGoogleResponseAsync(GoogleResponse googleResponse)
    {        
        if (googleResponse.Status == "OK")
        {
            // Check if Results is null or empty
            if (googleResponse.Results == null || !googleResponse.Results.Any())
            {
                throw new Exception("No results in Google Response.");
            }
    
            var firstResult = googleResponse.Results[0];
    
            // Build the address from the response 
            AddressComponentDto? addressComponents = BuildAddressFromGoogleResponse(firstResult?.Address_Components);
    
            if (addressComponents == null || firstResult?.Geometry == null)
            {
                throw new Exception("Error in Handling Google Response.");
            }
    
            // Build the response object with Latitude and Longitude
            GoogleApiAddressResponseDto? addressResponse = new GoogleApiAddressResponseDto(addressComponents, googleResponse);
            return addressResponse;
        }
    
        throw new Exception("Google API returned an error.");
    }

    /// <summary>
    /// Constructs an AddressComponentDto object from the provided Google address components.
    /// </summary>
    /// <param name="addressComponents">An array of Google address components.</param>
    /// <returns>A DTO containing the parsed address details, or null if the provided data is not sufficient.</returns>
    public AddressComponentDto? BuildAddressFromGoogleResponse(AddressComponent[]? addressComponents)
    {

        if (addressComponents == null || !addressComponents.Any()) return null;

        var address = new AddressComponentDto();

        foreach (var component in addressComponents)
        {
            if (component.Types == null || !addressComponents.Any()) continue;

            foreach (var type in component.Types)
            {
                switch (type)
                {
                    case "street_number":
                        address.StreetNumber = component.Long_Name;
                        break;
                    case "route":
                        address.StreetName = component.Long_Name;
                        break;
                    case "locality":
                        address.City = component.Long_Name;
                        break;
                    case "administrative_area_level_1":
                        // This assumes StateCode is an enum or can be parsed from the string.
                        address.State = component.Short_Name != null ? (StateCode)Enum.Parse(typeof(StateCode), component.Short_Name) : null;
                        break;
                    case "postal_code":
                        address.Zip = component.Long_Name;
                        break;
                }
            }
        }

        return address;
    }
}