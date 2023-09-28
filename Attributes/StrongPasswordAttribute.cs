
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;


namespace Budhub.Attributes;
public class StrongPasswordAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
    {
        /*
        Contains at least one lowercase letter.
        Contains at least one uppercase letter.
        Contains at least one digit.
        Contains at least one special character.
        Contains at least 8 characters in length.
        */
        if (value == null || string.IsNullOrEmpty(value.ToString()))
        {
            return new ValidationResult("The Password field is required");
        }

        Regex passwordRegex = new Regex(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$");

        if(!passwordRegex.IsMatch(value.ToString()!))
        {
            return new ValidationResult("Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters in length.");
        }

        return ValidationResult.Success!;
    }
}

public class StrongPasswordViolationException : Exception
{
    public StrongPasswordViolationException(string message) : base(message) { }
}