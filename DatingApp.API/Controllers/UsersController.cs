using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;                                               // 75. Using AutoMapper Part 1
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// 73. Creating the Users Controller
namespace DatingApp.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]                   // 134. Using Action Filters
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        // 75. Using AutoMapper Part 1
        private readonly IMapper _mapper;
        
        // 75. Using AutoMapper Part 1
        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            // 75. Using AutoMapper Part 1
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();

            // 75. Using AutoMapper Part 1
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            return Ok(usersToReturn);
        }

        //[HttpGet("{id}")]
        // 128. Updating the Register method in the API
        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);

            // 75. Using AutoMapper Part 1
            var userToReturn = _mapper.Map<UserForDetailedDto>(user);

            return Ok(userToReturn);
        }

        // 98. Persisting the Member updates
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(id);

            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();
            
            throw new Exception($"Updating user {id} failed on save");
        }
    }
}