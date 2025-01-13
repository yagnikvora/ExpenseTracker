using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Reflection;
using System.Transactions;

namespace ExpanceTrackerApi.Models
{
    public class TransactionsModel
    {
        public int TransactionId { get; set; }
        public string UserName { get; set; }
        public string CategoryName { get; set; }
        public string CategoryType { get; set; }
        public int CategoryId { get; set; }
        public string MethodName { get; set; }
        public int PaymentMethodId { get; set; }
        public double TransactionAmount { get; set; }
        public DateTime TransactionDate { get; set; }
        public string TransactionNotes { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
    }

    public class TransactionsInsertUpdateModel
    {
        public int TransactionId { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public int PaymentMethodId { get; set; }
        public double TransactionAmount { get; set; }
        public DateTime TransactionDate { get; set; }
        public string TransactionNotes { get; set; }
    }


    public class TransactionsInsertUpdateModelValidator : AbstractValidator<TransactionsInsertUpdateModel>
    {
        public TransactionsInsertUpdateModelValidator()
        {
            RuleFor(x => x.UserId)
                .GreaterThan(0)
                .WithMessage("User ID must be greater than zero.");

            RuleFor(x => x.CategoryId)
                .GreaterThan(0)
                .WithMessage("Category ID must be greater than zero.");

            RuleFor(x => x.PaymentMethodId)
                .GreaterThan(0)
                .WithMessage("Payment method ID must be greater than zero.");

            RuleFor(x => x.TransactionAmount)
                .GreaterThan(0)
                .WithMessage("Transaction amount must be greater than zero.");

            RuleFor(x => x.TransactionDate)
                .LessThanOrEqualTo(DateTime.Now)
                .WithMessage("Transaction date cannot be in the future.");

            RuleFor(x => x.TransactionNotes)
                .MaximumLength(500)
                .WithMessage("Transaction notes cannot exceed 500 characters.");
        }
    }
}
