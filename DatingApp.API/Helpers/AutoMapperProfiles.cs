using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;

// 75. Using AutoMapper Part 1
namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // 75. Using AutoMapper Part 1
            // CreateMap<User, UserForListDto>();
            // CreateMap<User, UserForDetailedDto>();  

            // 76. Using AutoMapper Part 2
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    //opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                    opt.MapFrom(d => d.DateOfBirth.CalculateAge());
                });

            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    //opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                    opt.MapFrom(d => d.DateOfBirth.CalculateAge());
                });

            CreateMap<Photo, PhotosForDetailedDto>();

            // 98. Persisting the Member updates
            CreateMap<UserForUpdateDto, User>();
        }
    }
}