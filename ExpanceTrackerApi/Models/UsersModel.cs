using FluentValidation;

namespace ExpanceTrackerApi.Models
{
    public class UsersModel
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string PasswordHash { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
    }

    public class UsersDropdownModel
    {
        public int UserId { get; set; }

        public string Name { get; set; }
    }
    public class UsersModelValidator : AbstractValidator<UsersModel>
    {
        public UsersModelValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage("Name is required.")
                .MaximumLength(100)
                .WithMessage("Name cannot exceed 100 characters.");

            RuleFor(x => x.Email)
                .NotEmpty()
                .WithMessage("Email is required.")
                .EmailAddress()
                .WithMessage("Invalid email format.")
                .MaximumLength(100)
                .WithMessage("Email cannot exceed 100 characters.");

            RuleFor(x => x.Mobile)
                .NotEmpty()
                .WithMessage("Mobile number is required.")
                .Matches(@"^\+?[1-9]\d{1,14}$")
                .WithMessage("Invalid mobile number format.");

            RuleFor(x => x.PasswordHash)
                .NotEmpty()
                .WithMessage("Password hash is required.")
                .MinimumLength(8)
                .WithMessage("Password hash must be at least 8 characters long.");

            RuleFor(x => x.CreatedAt)
                .NotEmpty()
                .WithMessage("CreatedAt is required.");

            RuleFor(x => x.ModifiedAt)
                .GreaterThanOrEqualTo(x => x.CreatedAt)
                .WithMessage("ModifiedAt must be greater than or equal to CreatedAt.");
        }
    }
}
