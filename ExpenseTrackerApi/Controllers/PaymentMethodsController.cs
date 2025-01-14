using ExpenseTracketApi.Data;
using ExpenseTracketApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTracketApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PaymentMethodsController : ControllerBase
    {
        private readonly PaymentMethodsRepository _paymentMethodRepository;

        public PaymentMethodsController(PaymentMethodsRepository paymentMethodRepository)
        {
            _paymentMethodRepository = paymentMethodRepository;
        }


        [HttpGet]
        public IActionResult GetAllPaymentMethods()
        {
            var paymentMethodList = _paymentMethodRepository.GetAllPaymentMethods();
            return Ok(paymentMethodList);
        }
        [HttpGet]
        public IActionResult PaymentMethodsDropdown()
        {
            var paymentMethodList = _paymentMethodRepository.PaymentMethodsDropdown();
            return Ok(paymentMethodList);
        }


        [HttpGet("{PaymentMethodsID}")]
        public IActionResult GetAllPaymentMethodsByID(int PaymentMethodsID)
        {
            var paymentMethodList = _paymentMethodRepository.GetPaymentMethodById(PaymentMethodsID);
            return Ok(paymentMethodList);
        }


        [HttpDelete("{PaymentMethodsID}")]
        public IActionResult DeletePaymentMethodsByID(int PaymentMethodsID)
        {
            var isDeleted = _paymentMethodRepository.DeleteUserByID(PaymentMethodsID);
            if (isDeleted)
                return Ok(new { Message = "PaymentMethods deleted successfully." });
            else
                return NotFound(new { Message = "PaymentMethods not found or could not be deleted." });
        }

        [HttpPost]
        public IActionResult InsertPaymentMethods([FromBody] PaymentMethodsInsertUpdateModel paymentMethod)
        {
            if (paymentMethod == null)
                return BadRequest(new { Message = "PaymentMethods data is required." });

            var isInserted = _paymentMethodRepository.InsertPaymentMethods(paymentMethod);
            if (isInserted)
                return Ok(new { Message = "PaymentMethods inserted successfully." });
            else
                return StatusCode(500, new { Message = "PaymentMethods could not be inserted." });
        }

        [HttpPut("{PaymentMethodID}")]
        public IActionResult UpdatePaymentMethods(int PaymentMethodID, [FromBody] PaymentMethodsInsertUpdateModel paymentMethod)
        {
            if (paymentMethod == null || PaymentMethodID != paymentMethod.PaymentMethodId)
                return BadRequest(new { Message = "Invalid paymentMethod data or ID mismatch." });

            var isUpdated = _paymentMethodRepository.UpdatePaymentMethods(paymentMethod);
            if (isUpdated)
                return Ok(new { Message = "PaymentMethods updated successfully." });
            else
                return NotFound(new { Message = "PaymentMethods not found or could not be updated." });
        }

    }
}
