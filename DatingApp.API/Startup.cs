using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;                                       // 75. Using AutoMapper Part 1
using DatingApp.API.Data;                               // 8. Creating the first Model and DataContex
using DatingApp.API.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;                    // 8. Creating the first Model and DataContex
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            // 8. Creating the first Model and DataContex
            services.AddDbContext<DataContext>(x => x.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            
            // 73. Creating the Users Controller
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddJsonOptions(opt => {
                    opt.SerializerSettings.ReferenceLoopHandling = 
                        Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });

            // 16. Adding CORS support to the API
            services.AddCors();

            // 103. Using Cloudinary as a photo storage solution
            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));
            
            // 75. Using AutoMapper Part 1
            services.AddAutoMapper();

            // 71. Seeding Data to the Database Part 2
            services.AddTransient<Seed>();

            // 28. Registering services in the Startup class
            services.AddScoped<IAuthRepository, AuthRepository>();

            // 72. Creating a new repository for our API
            services.AddScoped<IDatingRepository, DatingRepository>();

            // 34. Using the Authentication middleware
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // 71. Seeding Data to the Database Part 2
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, Seed seeder)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // 5. Reviewing the Project files in the DotNet Web API
                // app.UseHsts();

                // 49. Setting up the Global exception handler in the API - begin
                app.UseExceptionHandler(builder => {
                    builder.Run(async context => {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if (error != null) 
                        {
                            context.Response.AddApplicationError(error.Error.Message);
                            await context.Response.WriteAsync(error.Error.Message);
                        }
                    });
                });
                // 49. Setting up the Global exception handler in the API - end               
            }

            // 5. Reviewing the Project files in the DotNet Web API
            // app.UseHttpsRedirection();

            // 71. Seeding Data to the Database Part 2
            //seeder.SeedUsers();

            // 16. Adding CORS support to the API
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            // 34. Using the Authentication middleware
            app.UseAuthentication();

            app.UseMvc();
        }
    }
}
