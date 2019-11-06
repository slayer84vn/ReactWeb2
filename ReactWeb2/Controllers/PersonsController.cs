using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ReactWeb2.Models;

namespace ReactWeb2.Controllers
{
    [Authorize]
    public class PersonsController : ODataController
    {
        SchoolDBContext db = new SchoolDBContext();
        private bool PersonExists(int key)
        {
            return db.Person.Any(p => p.PersonId == key);
        }
        

        [EnableQuery()]
        [HttpGet]
        public IQueryable<Person> Get()
        {
            return db.Person;
        }
   

        [EnableQuery()]
        [HttpGet("{id}")]
        public SingleResult<Person> Get([FromODataUri] int key)
        {
            IQueryable<Person> result = db.Person.Where(p => p.PersonId == key);
            return SingleResult.Create(result);
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Person Person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            db.Person.Add(Person);
            await db.SaveChangesAsync();
            return Created(Person);
        }
        [HttpPatch]
        public async Task<IActionResult> Patch([FromODataUri] int key, Delta<Person> Person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var entity = await db.Person.FindAsync(key);
            if (entity == null)
            {
                return NotFound();
            }
            Person.Patch(entity);
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Updated(entity);
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromODataUri] int key, Person update)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (key != update.PersonId)
            {
                return BadRequest();
            }
            db.Entry(update).State = EntityState.Modified;
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Updated(update);
        }
        [HttpDelete]
        public async Task<IActionResult> Delete([FromODataUri] int key)
        {
            var Person = await db.Person.FindAsync(key);
            if (Person == null)
            {
                return NotFound();
            }
            db.Person.Remove(Person);
            await db.SaveChangesAsync();
            return NoContent();
        }
    }
}
