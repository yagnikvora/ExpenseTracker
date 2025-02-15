using FluentValidation;

namespace ExpenseTracketApi.Models
{
    public class UsersModel
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string PasswordHash { get; set; }
        public bool HOF {  get; set; } = false;
        public string HOFName {  get; set; }
        public int HOFId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
    }
    public class UserLoginModel
    {
        public string Email { get; set; }
        public string PasswordHash { get; set; }
    }
    public class UsersDropdownModel
    {
        public int UserId { get; set; }

        public string Name { get; set; }
    }
}
