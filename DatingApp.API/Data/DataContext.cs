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

        // 150. Creating the Like entity
        public DbSet<Like> Likes { get; set; }


       
        // 150. Creating the Like entity
        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Create a primary key - LikerId + LikeeId
            builder.Entity<Like>()
                .HasKey(k => new {k.LikerId, k.LikeeId});

            // Create a Foreign Key - LikeeId
            builder.Entity<Like>()
                .HasOne(u => u.Likee)
                .WithMany(u => u.Likers)
                .HasForeignKey(u => u.LikeeId)
                .OnDelete(DeleteBehavior.Restrict);

            // Create a Foreign Key - LikerId
            builder.Entity<Like>()
                .HasOne(u => u.Liker)
                .WithMany(u => u.Likees)
                .HasForeignKey(u => u.LikerId)
                .OnDelete(DeleteBehavior.Restrict);            
            
        }

    }
}