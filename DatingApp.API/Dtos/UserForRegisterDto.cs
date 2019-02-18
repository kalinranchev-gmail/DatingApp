using System;
using System.ComponentModel.DataAnnotations;

// 30. Using DTOs (Data Transfer Objects)
namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        // 30. Using DTOs (Data Transfer Objects)
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify a password between 4 and 8 characters")]
        public string Password { get; set; }


        // 128. Updating the Register method in the API
        [Required]
        public string Gender { get; set; }

        [Required]
        public string KnownAs { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Country { get; set; }

        public DateTime Created { get; set; }
        
        public DateTime LastActive { get; set; }

        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }

    }    
}