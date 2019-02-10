using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    // 8. Creating the first Model and DataContex
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Value> Values { get; set; }
        
        // 23. Creating the User model
        public DbSet<User> Users { get; set; }
        
        // 67. Extending the User Model 
        public DbSet<Photo> Photos { get; set; }
    }
}