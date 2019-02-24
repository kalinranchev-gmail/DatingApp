// 138. Setting up the paging helper classes
namespace DatingApp.API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize;}
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value;}
        }

        // 142. Filtering in the API    
        public int UserId { get; set; }
        public string Gender { get; set; }

        // 143. Adding additional filtering parameters to the API
        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 99;

        // 145. Sorting results in the API
        public string OrderBy { get; set; }

    }
}