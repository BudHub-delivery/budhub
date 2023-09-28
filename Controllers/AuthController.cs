using Microsoft.AspNetCore.Mvc;
using Budhub.Models;
using MyApp.Utilities;
using Budhub.Services;
using Budhub.DataTransfer.Tokens;
using Budhub.DataTransfer.Users;
using Microsoft.AspNetCore.Cors;

namespace Budhub.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ITokenService _tokenService;

    public AuthController(IUserService userService, ITokenService tokenService)
    {
        _userService = userService;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserWithRoleDto>> RegisterUserAsync(User user)
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

    [HttpPost("login")]
    public async Task<ActionResult<TokensDto>> LoginAsync(LoginUser loginUser)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        //TODO: Return a dashboard DTO eventually or something along those lines which will contain user data as well.
        UserDto? validUser = await _userService.ValidatePasswordAsync(loginUser);

        if (validUser == null)
        {
            return BadRequest("Invalid email or password");
        }

        bool refreshTokensCleared = await _tokenService.DeactivateRefreshTokensForUserAsync(validUser.Id);

        if (refreshTokensCleared == false)
        {
            return StatusCode(500, "Error updating user tokens, try again.");
        }

        TokensDto? tokens = await _tokenService.CreateTokensDtoAsync(validUser.Id);

        if (tokens == null)
        {
            return StatusCode(500, "error saving new refreshtoken to database");
        }

        return Ok(tokens);
    }

    [HttpGet("test")]
    public string Test()
    {
        return "Hello, world.";
    }
}
