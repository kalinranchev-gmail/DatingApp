// 72. Creating a new repository for our API
using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Helpers;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IDatingRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();

         // Task<IEnumerable<User>> GetUsers();         
         // 139. Implementing pagination in the API
         Task<PagedList<User>> GetUsers(UserParams userParams);
         
         Task<User> GetUser(int id);         

         // 105. Creating the Photos Controller Part 2
         Task<Photo> GetPhoto(int id);

        // 110. Adding the Set Main photo functionality to the API
         Task<Photo> GetMainPhotoForUser(int userId);
    }
}