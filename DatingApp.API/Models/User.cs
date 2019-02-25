using System;
using System.Collections;
using System.Collections.Generic;

namespace DatingApp.API.Models
{
    // 23. Creating the User model
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        // 67. Extending the User Model 
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }

        public ICollection<Photo> Photos { get; set; }

        // 150. Creating the Like entity
        public ICollection<Like> Likers { get; set; }
        public ICollection<Like> Likees { get; set; }

    }
}