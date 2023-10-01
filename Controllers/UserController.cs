using Microsoft.AspNetCore.Mvc;
using Budhub.Models;
using Budhub.DataTransfer;
using Budhub.DataTransfer.Addresses;
using Budhub.Services;

namespace Budhub.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{

    private readonly IUserService _userService;
    private readonly IAddressService _addressService;

    public UserController(IUserService userService, IAddressService addressService)
    {
        _userService = userService;
        _addressService = addressService;
    }
  
   [HttpGet("address/validate")]
    public async Task<ActionResult<AddressValidationResultDto>> ValidateAddressWithGoogleApiAsync(Address address)
    {
        //Check the Modelstate of the incoming User, return errors if it fails.
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        //Get Address Validation Result from GoogleAPI
        AddressValidationResultDto? validationResult = await _addressService.ValidateAddressAsync(address);


        if (validationResult == null)
        {
            // Error must be unknown, because GoogleAPI should return a result for a valid address query.
            return StatusCode(500, "Address Validation Error");
        }

        //TODO: Create AddressCompareDto to return to customer to validate Provides vs. GoogleAPI Validated
        return validationResult;
    }

    // [HttpPost("address/add")]
    // public async Task<ActionResult<ConfirmedAddressWithUserDto>> ConfirmAndSaveAddressAsync(Address address)
    // {
    //   //Check the Modelstate of the incoming User, return errors if it fails.
    //   if (!ModelState.IsValid)
    //   {
    //       return BadRequest(ModelState);
    //   }
    //   //TODO: USERSERVICE Get user from JWT token

    //   //Check if the user is valid.
    //   ConfirmedAddressWithUserDto? validAddress = await _addressService.SaveAddressAsync(address);


    //   if (validationResult == null)
    //   {
    //       // Error must be unknown, because GoogleAPI should return a result for a valid address query.
    //       return StatusCode(500, ResponseMessage.AddressValidationError);
    //   }

    //   //TODO: Create AddressCompareDto to return to customer to validate Provides vs. GoogleAPI Validated
    //   return validationResult;
    // }

}
