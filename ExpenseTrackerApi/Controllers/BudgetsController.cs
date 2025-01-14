using ExpenseTracketApi.Data;
using ExpenseTracketApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTracketApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BudgetsController : ControllerBase
    {
        private readonly BudgetsRepository _budgetRepository;

        public BudgetsController(BudgetsRepository budgetRepository)
        {
            _budgetRepository = budgetRepository;
        }


        [HttpGet]
        public IActionResult GetAllBudgets()
        {
            var budgetList = _budgetRepository.GetAllBudgets();
            return Ok(budgetList);
        }


        [HttpGet]
        public IActionResult RemainBudgetAllCategories()
        {
            var budgetList = _budgetRepository.RemainBudgetAllCategories();
            return Ok(budgetList);
        }


        [HttpGet("{BudgetsID}")]
        public IActionResult GetAllBudgetsByID(int BudgetsID)
        {
            var budgetList = _budgetRepository.GetUserById(BudgetsID);
            return Ok(budgetList);
        }
        
        [HttpGet("{UserID}")]
        public IActionResult BudgetUsedByUser(int UserID)
        {
            var budgetList = _budgetRepository.BudgetUsedByUser(UserID);
            return Ok(budgetList);
        }


        [HttpDelete("{BudgetsID}")]
        public IActionResult DeleteBudgetsByID(int BudgetsID)
        {
            var isDeleted = _budgetRepository.DeleteUserByID(BudgetsID);
            if (isDeleted)
                return Ok(new { Message = "Budgets deleted successfully." });
            else
                return NotFound(new { Message = "Budgets not found or could not be deleted." });
        }

        [HttpPost]
        public IActionResult InsertBudgets([FromBody] BudgetsInsertUpdateModel budget)
        {
            if (budget == null)
                return BadRequest(new { Message = "Budgets data is required." });

            var isInserted = _budgetRepository.InsertBudgets(budget);
            if (isInserted)
                return Ok(new { Message = "Budgets inserted successfully." });
            else
                return StatusCode(500, new { Message = "Budgets could not be inserted." });
        }

        [HttpPut("{BudgetID}")]
        public IActionResult UpdateBudgets(int BudgetID, [FromBody] BudgetsInsertUpdateModel budget)
        {
            if (budget == null || BudgetID != budget.BudgetId)
                return BadRequest(new { Message = "Invalid budget data or ID mismatch." });

            var isUpdated = _budgetRepository.UpdateBudgets(budget);
            if (isUpdated)
                return Ok(new { Message = "Budgets updated successfully." });
            else
                return NotFound(new { Message = "Budgets not found or could not be updated." });
        }

    }
}
