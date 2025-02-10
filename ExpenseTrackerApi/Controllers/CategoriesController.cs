﻿using ExpenseTracketApi.Data;
using ExpenseTracketApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTracketApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class CategoriesController : ControllerBase
    {
        private readonly CategoriesRepository _categoryRepository;

        public CategoriesController(CategoriesRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }


        [HttpGet]
        public IActionResult GetAllCategories()
        {
            var categoryList = _categoryRepository.GetAllCategories();
            return Ok(categoryList);
        }
        [HttpGet]
        public IActionResult CategoriesDropdown()
        {
            var categoryList = _categoryRepository.CategoriesDropdown();
            return Ok(categoryList);
        }
        [HttpGet]
        public IActionResult CategoriesRemainDropdown()
        {
            var categoryList = _categoryRepository.CategoriesRemainDropdown();
            return Ok(categoryList);
        }


        [HttpGet("{CategoryID}")]
        public IActionResult GetAllCategoriesByID(int CategoryID)
        {
            var categoryList = _categoryRepository.GetCategoryById(CategoryID);
            return Ok(categoryList);
        }


        [HttpDelete("{CategoryID}")]
        public IActionResult DeleteCategoriesByID(int CategoryID)
        {
            var result = _categoryRepository.DeleteCategoryByID(CategoryID);
            if (result == 1)
                return Ok(new { success = true, message = "Category deleted successfully." });
            else if (result == -1)
                return BadRequest(new { success = false, message = "Cannot delete category as it is associated with other records." });
            else
                return NotFound(new { success = false, message = "Category not found." });
        }

        [HttpPost]
        public IActionResult InsertCategories([FromBody] CategoriesInsertUpdateModel category)
        {
            if (category == null)
                return BadRequest(new { Message = "Categories data is required." });

            var isInserted = _categoryRepository.InsertCategories(category);
            if (isInserted)
                return Ok(new { Message = "Categories inserted successfully." });
            else
                return StatusCode(500, new { Message = "Categories could not be inserted." });
        }

        [HttpPut("{CategoryID}")]
        public IActionResult UpdateCategories(int CategoryID, [FromBody] CategoriesInsertUpdateModel category)
        {
            if (category == null || CategoryID != category.CategoryId)
                return BadRequest(new { Message = "Invalid category data or ID mismatch." });

            var isUpdated = _categoryRepository.UpdateCategories(category);
            if (isUpdated)
                return Ok(new { Message = "Categories updated successfully." });
            else
                return NotFound(new { Message = "Categories not found or could not be updated." });
        }

    }
}
