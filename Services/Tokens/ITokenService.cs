using Budhub.DataTransfer.Tokens;

namespace Budhub.Services;
public interface ITokenService
{
    Task<bool> DeactivateRefreshTokensForUserAsync(int userId);
    Task<TokensDto?> CreateTokensDtoAsync(int userId);
    string GenerateRefreshToken();
    string GenerateAccessToken(int userId);
    // Task<bool> ValidateRefreshTokenAsync(string rft);
    // Task<TokensDto> DoRefreshActionAsync(string rft);
    // int GetClaimFromHeaderValue(HttpRequest request);
}