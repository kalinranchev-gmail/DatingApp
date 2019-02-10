using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;                                           // 75. Using AutoMapper Part 1
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// 73. Creating the Users Controller
namespace DatingApp.API.Controllers
{
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);

            // 75. Using AutoMapper Part 1
            var userToReturn = _mapper.Map<UserForDetailedDto>(user);

            return Ok(userToReturn);
        }
    }
}