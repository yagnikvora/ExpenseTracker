using FluentValidation;

namespace ExpanceTrackerApi.Models
{
    public class PaymentMethodsModel
    {
        public int PaymentMethodId { get; set; }
        public string UserName { get; set; }
        public string MethodName { get; set; }
        public string Details { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
    }


    public class PaymentMethodsInsertUpdateModel
    {
        public int PaymentMethodId { get; set; }
        public string MethodName { get; set; }
        public string Details { get; set; }
        public int UserId { get; set; }
    }

    public class PaymentMethodsInsertUpdateModelValidator : AbstractValidator<PaymentMethodsInsertUpdateModel>
    {
        public PaymentMethodsInsertUpdateModelValidator()
        {
            RuleFor(x => x.MethodName)
                .NotEmpty()
                .WithMessage("Method name is required.")
                .MaximumLength(100)
                .WithMessage("Method name cannot exceed 100 characters.");

            RuleFor(x => x.Details)
                .MaximumLength(500)
                .WithMessage("Details cannot exceed 500 characters.");

            RuleFor(x => x.UserId)
                .GreaterThan(0)
                .WithMessage("User ID must be greater than zero.");

        }
    }
}
