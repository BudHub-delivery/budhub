using Microsoft.AspNetCore.Mvc;
using Budhub.Models;
using Budhub.DataTransfer;
using MyApp.Utilities;
using Budhub.Services;

namespace Budhub.Controllers;
[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;

    public AuthController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    async public Task<ActionResult<UserWithRoleDto>> RegisterUser(User user)
    {
        //Check the Modelstate of the incoming User, return errors if it fails.
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        //Use the _userService to create the user.
        UserWithRoleDto? newUser = await _userService.CreateAsync(user);

        if (newUser == null)
        {
            //error must be unknown, because the database should be able to save a validated user object.
            return StatusCode(500, ResponseMessage.DatabaseSaveError);
        }
        return newUser;
    }
}
