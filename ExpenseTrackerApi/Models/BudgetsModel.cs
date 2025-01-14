using FluentValidation;

namespace ExpenseTracketApi.Models
{
    public class BudgetsModel
    {
        public int BudgetId { get; set; }
        public string UserName { get; set; }
        public string CategoryName { get; set; }
        public int CategoryId { get; set; }
        public double Amount { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }

    }

    public class BudgetsInsertUpdateModel
    {
        public int BudgetId { get; set; }
        public int CategoryId { get; set; }
        public int UserId { get; set; }
        public double Amount { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }

    }

    public class BudgetsInsertUpdateModelValidator : AbstractValidator<BudgetsInsertUpdateModel>
    {
        public BudgetsInsertUpdateModelValidator()
        {
            RuleFor(x => x.CategoryId)
                .GreaterThan(0)
                .WithMessage("Category ID must be greater than zero.");

            RuleFor(x => x.UserId)
                .GreaterThan(0)
                .WithMessage("User ID must be greater than zero.");

            RuleFor(x => x.Amount)
                .GreaterThan(0)
                .WithMessage("Amount must be greater than zero.");

            RuleFor(x => x.StartDate)
                .NotEmpty()
                .WithMessage("Start date is required.");

            RuleFor(x => x.EndDate)
                .GreaterThan(x => x.StartDate)
                .WithMessage("End date must be later than start date.");

        }
    }

    public class RemainBudgets
    {
        public string CategoryName { get; set; }
        public string CategoryType { get; set; }
        public double  BudgetAmount { get; set; }
        public double Spent_Amount { get; set; }
        public double Remaining_Budget { get; set; }

    }
}
