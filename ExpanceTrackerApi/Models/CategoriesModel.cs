using FluentValidation;
using System.Globalization;

namespace ExpanceTrackerApi.Models
{
    public class CategoriesModel
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string CategoryType { get; set; }
        public string CategoryDescription { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string UserName { get; set; }   
        public int UserId { get; set; } 
    }

    public class CategoryDropdownModel
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
    public class CategoriesInsertUpdateModel
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string CategoryType { get; set; }
        public string CategoryDescription { get; set; }
        public int UserId { get; set; }
    }

    public class CategoriesInsertUpdateModelValidator : AbstractValidator<CategoriesInsertUpdateModel>
    {
        public CategoriesInsertUpdateModelValidator()
        {
            RuleFor(x => x.CategoryName)
                .NotEmpty()
                .WithMessage("Category name is required.")
                .MaximumLength(100)
                .WithMessage("Category name cannot exceed 100 characters.");

            RuleFor(x => x.CategoryType)
                .NotEmpty()
                .WithMessage("Category type is required.")
                .MaximumLength(50)
                .WithMessage("Category type cannot exceed 50 characters.");

            RuleFor(x => x.CategoryDescription)
                .MaximumLength(500)
                .WithMessage("Category description cannot exceed 500 characters.");

            RuleFor(x => x.UserId)
                .GreaterThan(0)
                .WithMessage("User ID must be greater than zero.");
        }
    }
}
