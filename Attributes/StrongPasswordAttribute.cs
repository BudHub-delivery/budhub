public class StrongPasswordAttributes : ValidationAttribute
{
  protected override ValidationResult IsValid(object value, ValidationContext validationContext)
  {
    var password = value as string;
    /*
      Contains at least one lowercase letter.
      Contains at least one uppercase letter.
      Contains at least one digit.
      Contains at least one special character.
      Contains at least 8 characters in length.
     */
    var passwordRegex = new Regex(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$");

    if(!passwordRegex.IsMatch(password))
    {
      throw new StrongPasswordViolationException("Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters in length.");
    }

    return true;
  }
}

public class StrongPasswordViolationException : Exception
{
    public StrongPasswordViolationException(string message) : base(message) { }
}