using ExpanceTrackerApi.Data;
using ExpanceTrackerApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExpanceTrackerApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UsersRepository _userRepository;

        public UsersController(UsersRepository userRepository)
        {
            _userRepository = userRepository;
        }


        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var userList = _userRepository.GetAllUsers();
            return Ok(userList);
        }


        [HttpGet("{UsersID}")]
        public IActionResult GetAllUsersByID(int UsersID)
        {
            var userList = _userRepository.GetUserById(UsersID);
            return Ok(userList);
        }


        [HttpDelete("{UsersID}")]
        public IActionResult DeleteUsersByID(int UsersID)
        {
            var isDeleted = _userRepository.DeleteUserByID(UsersID);
            if (isDeleted)
                return Ok(new { Message = "Users deleted successfully." });
            else
                return NotFound(new { Message = "Users not found or could not be deleted." });
        }

        [HttpPost]
        public IActionResult InsertUsers([FromBody] UsersModel user)
        {
            if (user == null)
                return BadRequest(new { Message = "Users data is required." });

            var isInserted = _userRepository.InsertUsers(user);
            if (isInserted)
                return Ok(new { Message = "Users inserted successfully." });
            else
                return StatusCode(500, new { Message = "Users could not be inserted." });
        }

        [HttpPut("{UsersID}")]
        public IActionResult UpdateUsers(int UsersID, [FromBody] UsersModel user)
        {
            if (user == null || UsersID != user.UserId)
                return BadRequest(new { Message = "Invalid user data or ID mismatch." });

            var isUpdated = _userRepository.UpdateUsers(user);
            if (isUpdated)
                return Ok(new { Message = "Users updated successfully." });
            else
                return NotFound(new { Message = "Users not found or could not be updated." });
        }

    }
}
