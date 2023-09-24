using Microsoft.AspNetCore.Mvc;
using Budhub.Models;
using Budhub.DataTransfer;
namespace Budhub.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    [HttpGet("test")]
    async public Task<ActionResult<UserDto>> Test()
    {
        await Task.Delay(1); //TODO: this is just here to avoid "Lacks await operators" until we set up the DB.
        User testUser = new()
        {
            UserId = 1,
            FirstName = "Hello",
            LastName = "World",
            Email = "test@gmail.com",
        };
        return new UserDto(testUser);
    }
}
