// 67. Extending the User Model
using System;

namespace DatingApp.API.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }

        // 103. Using Cloudinary as a photo storage solution
        public string PublicId { get; set; }

        // 69. Entity Framework Relationships
        public User User { get; set; }
        public int UserId { get; set; }
    }
}