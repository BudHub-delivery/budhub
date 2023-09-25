
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Budhub.DataStorage;
using Budhub.DataTransfer.Tokens;
using Budhub.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Budhub.Services;
public class TokenService : ITokenService
{
    private readonly DBContext _context;
    private readonly IConfiguration _config;
    
    public TokenService(DBContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    public async Task<TokensDto?> CreateTokensDtoAsync(int userId)
    {
        RefreshToken rft = new()
        {
            Value = GenerateRefreshToken(),
            UserId = userId
        };
        try
        {
            string jwt = GenerateAccessToken(userId);
            await DeactivateRefreshTokensForUserAsync(userId);
            await _context.RefreshTokens.AddAsync(rft);
            await _context.SaveChangesAsync();
            return new TokensDto(rft, jwt);
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine(ex.Message);
            return null;
        }
        catch (DbUpdateException ex)
        {
            Console.WriteLine(ex.Message);
            return null;
        }
        catch
        {
            Console.WriteLine("Unknown error in CreateTokensDTO");
            return null;
        }
    }

    public async Task<bool> DeactivateRefreshTokensForUserAsync(int userId)
    {
         List<RefreshToken> tokens = await _context.RefreshTokens
                                                    .Where(t => t.UserId == userId)
                                                    .ToListAsync();
        try
        {
            foreach (RefreshToken t in tokens)
            {
                t.IsActive = false;
                t.DeletedAt = DateTime.UtcNow;
                t.UpdatedAt = DateTime.UtcNow;
            }
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception ex)
        {
            //TODO: We will Add logger functionality to log the error instead of just console.
            Console.WriteLine(ex.Message);
            return false;
        }
    }

    public string GenerateAccessToken(int userId)
    {
        string? encKey = _config["Jwt:SecretKey"];
        if (string.IsNullOrEmpty(encKey) || encKey.Length < 16)
        {
            throw new InvalidOperationException("Jwt Secret is Invalid or Missing.");
        }

        byte[] key = Encoding.ASCII.GetBytes(encKey);

        JwtSecurityTokenHandler handler = new();
        SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new(ClaimTypes.Name, Convert.ToString(userId))
            }),
            Audience = _config["Jwt:Audience"],
            Issuer = _config["Jwt:Issuer"],
            Expires = DateTime.UtcNow.AddHours(2),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
            SecurityAlgorithms.HmacSha256Signature)
        };
        SecurityToken token = handler.CreateToken(tokenDescriptor);
        return handler.WriteToken(token);
    }

    public string GenerateRefreshToken()
    {
        using var rng = RandomNumberGenerator.Create();
        byte[] byteToken = new byte[32]; //128 bit
        rng.GetBytes(byteToken);
        return Convert.ToBase64String(byteToken);
    }
}