using Microsoft.AspNetCore.Mvc;
using Budhub.Models;
using Budhub.DataTransfer;
namespace Budhub.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    //This controller will be the only controller that does not require a JWT to access
    //It is the entrypoint for registering, logging in (getting new tokens), and refreshing tokens.
    //Eventually all other controllers will be Authorized, meaning a valid AccessToken will be required to fetch data.
}
