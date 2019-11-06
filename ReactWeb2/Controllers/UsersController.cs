using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using ReactWeb2.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.AspNet.OData;

namespace ReactWeb2.Controllers
{
    [Authorize]
    public class UsersController : ODataController
    {
        [AllowAnonymous]
        [HttpPost]
        [HttpGet]
        public IActionResult Post([FromBody]string username, [FromBody] string password)
        {
            SchoolDBContext db = new SchoolDBContext();
            var user = db.Person.FirstOrDefault();

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("8933BB46BAD78418E350FD714C41B189C5B1ED4D096D3C8E06BA5CF472CEC776");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.PersonId.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic user info (without password) and token to store client side
            return Ok(new
            {
                Id = user.PersonId,
                Token = tokenString
            });
        }

    }
}
