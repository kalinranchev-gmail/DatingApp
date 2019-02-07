using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data;                                   // 10. Retrieving data from the Database
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;                        // 10. Retrieving data from the Database

namespace DatingApp.API.Controllers
{
    [Authorize]                         // 34. Using the Authentication middleware
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // 10. Retrieving data from the Database - begin
        private readonly DataContext _context;

        public ValuesController(DataContext context)
        {
            _context = context;
        }

        // 11. Making our code asynchronous - begin
        // GET api/values
        [HttpGet]
        [AllowAnonymous]                                    // 43. Parent to Child Component communication using Input properties
        public async Task<IActionResult> GetValues()
        {
            var values = await _context.Values.ToListAsync();

            return Ok(values);
        }

        // GET api/values/5
        // 11. Making our code asynchronous - end
        [AllowAnonymous]                                // 34. Using the Authentication middleware
        [HttpGet("{id}")]
        public async Task<IActionResult> GetValue(int id)
        {
            var value = await _context.Values.FirstOrDefaultAsync(x => x.Id == id);

            return Ok(value);
        }
       

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
