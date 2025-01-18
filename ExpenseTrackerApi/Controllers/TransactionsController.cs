using ExpenseTracketApi.Data;
using ExpenseTracketApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTracketApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class TransactionsController : ControllerBase
    {
        private readonly TransactionsRepository _transactionRepository;

        public TransactionsController(TransactionsRepository transactionRepository)
        {
            _transactionRepository = transactionRepository;
        }


        [HttpGet]
        public IActionResult GetAllTransactions()
        {
            var transactionList = _transactionRepository.GetAllTransactions();
            return Ok(transactionList);
        }


        [HttpGet("{TransactionID}")]
        public IActionResult GetAllTransactionsByID(int TransactionID)
        {
            var transactionList = _transactionRepository.GetUserById(TransactionID);
            return Ok(transactionList);
        }


        [HttpDelete("{TransactionID}")]
        public IActionResult DeleteTransactionsByID(int TransactionID)
        {
            var isDeleted = _transactionRepository.DeleteUserByID(TransactionID);
            if (isDeleted)
                return Ok(new { Message = "Transaction deleted successfully." });
            else
                return NotFound(new { Message = "Transaction not found or could not be deleted." });
        }

        [HttpPost]
        public IActionResult InsertTransactions([FromBody] TransactionsInsertUpdateModel transaction)
        {
            if (transaction == null)
                return BadRequest(new { Message = "Transaction data is required." });

            var isInserted = _transactionRepository.InsertTransactions(transaction);
            if (isInserted)
                return Ok(new { Message = "Transaction inserted successfully." });
            else
                return StatusCode(500, new { Message = "Transaction could not be inserted." });
        }

        [HttpPut("{TransactionID}")]
        public IActionResult UpdateTransactions(int TransactionID, [FromBody] TransactionsInsertUpdateModel transaction)
        {
            if (transaction == null || TransactionID != transaction.TransactionId)
                return BadRequest(new { Message = "Invalid transaction data or ID mismatch." });

            var isUpdated = _transactionRepository.UpdateTransactions(transaction);
            if (isUpdated)
                return Ok(new { Message = "Transaction updated successfully." });
            else
                return NotFound(new { Message = "Transaction not found or could not be updated." });
        }

    }
}
