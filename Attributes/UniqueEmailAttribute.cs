using System.ComponentModel.DataAnnotations;
using Budhub.DataStorage;

namespace MyApp.CustomAnnotations;
public class UniqueEmailAttribute : ValidationAttribute
{
    public DBContext? Db { get; set; }

    protected override ValidationResult IsValid(object? email, ValidationContext validationContext)
    {
        var checkContext = validationContext.GetService(typeof(DBContext));

        if (checkContext == null)
        {
            return new ValidationResult("DBContext unavailable");
        }

        Db = (DBContext)checkContext;

        if (email == null)
        {
            return new ValidationResult("Email object not found in validator.");
        }

        if (Db.Users.Any(u=>u.Email == email.ToString()))
        {
            return new ValidationResult("Email already exists.");
        }
        return ValidationResult.Success!;
    }
}