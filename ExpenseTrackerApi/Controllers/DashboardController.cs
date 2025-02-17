using ExpenseTrackerApi.Data;
using ExpenseTracketApi.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTrackerApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    //[Authorize]
    public class DashboardController : ControllerBase
    {

        private readonly DashboardRepository _dashboardRepository;

        public DashboardController(DashboardRepository dashboardRepository)
        {
            _dashboardRepository = dashboardRepository;
        }


        [HttpGet("{HOFId}")]
        public IActionResult GetDashboardData(int HOFId)
        {
            var dashboardData = _dashboardRepository.GetDashboardData(HOFId);
            return Ok(dashboardData);
        }
    }
}
