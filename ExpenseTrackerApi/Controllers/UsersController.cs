using ExpenseTracketApi.Data;
using ExpenseTracketApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using JwtRegisteredClaimNames = System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames;

namespace ExpenseTracketApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UsersRepository _userRepository;
        private readonly IConfiguration _configuration;

        public UsersController(UsersRepository userRepository,IConfiguration configuration )
        {
            _configuration = configuration;
            _userRepository = userRepository;
        }


        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var userList = _userRepository.GetAllUsers();
            return Ok(userList);
        }

        [HttpGet]
        public IActionResult UsersDropdown()
        {
            var userList = _userRepository.UsersDropdown();
            return Ok(userList);
        }


        [HttpGet("{UsersID}")]
        public IActionResult GetAllUsersByID(int UsersID)
        {
            var userList = _userRepository.GetUserById(UsersID);
            return Ok(userList);
        }

        [HttpPost]
        public IActionResult Login([FromBody] UserLoginModel user)
        {
            var userData = _userRepository.Login(user);
            if (userData != null)
            {
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"] ),
                    new Claim(JwtRegisteredClaimNames.Jti,  Guid.NewGuid().ToString()),
                    new Claim("UserId", userData.UserId.ToString()),
                    new Claim("Email", userData.Email.ToString()),
                    new Claim("Mobile", userData.Mobile.ToString()),

                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key , SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    _configuration["Jwt:Issuer"],
                    _configuration["Jwt:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddDays(7),
                    signingCredentials: signIn
                    );

                string tockenValue = new JwtSecurityTokenHandler().WriteToken(token);
                return Ok(new {Token = tockenValue, User = userData , Message = "User Login Successfully" });
            }

            return BadRequest(new {Message = "Please enter valid Email and password"});
        }

        [HttpPost]
        public IActionResult Register([FromBody] UsersModel user)
        {
            if (user == null)
                return BadRequest(new { Message = "Users data is required." });

            var isInserted = _userRepository.Register(user);
            if (isInserted)
                return Ok(new { Message = "Users Registred successfully." });
            else
                return StatusCode(500, new { Message = "Users could not be inserted." });
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
