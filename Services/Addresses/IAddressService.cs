using Budhub.Models;
using Budhub.DataTransfer.Addresses;

namespace Budhub.Services;
public interface IAddressService
{
    // Task<ValidatedAddressDto?> SaveAddressAsync(User user, Address address);
    Task<AddressValidationResultDto?> ValidateAddressAsync(Address address);
    // Task<ValidatedAddressDto?> UpdateAsync(User user, Address address);
}