namespace MyApp.Utilities;
public static class ResponseMessage
{
    //Error Messages
    public const string DatabaseSaveError = "An error occurred. Please try again.";
    public const string ValidationError = "Validation failed:";
    public const string UnauthorizedAccess = "You do not have permission to access this resource.";
    public const string NotFound = "The requested resource could not be found.";
    public const string GeneralError = "An internal error occurred. Please try again later.";

    //Success Messages
    public const string GeneralSuccess = "Request completed successfully.";
}
