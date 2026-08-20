using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using System.Security.Claims;

namespace backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class QuotesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public QuotesController(AppDbContext context)
        {
            _context = context;
        }

        // helper: abstract current user Id from JWT token
        private int GetCurrentUserId()
        {
            return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        }

        // GET: api/quotes  only return quotes from current Id 
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quote>>> GetQuotes()
        {
            int userId = GetCurrentUserId();
            return await _context.Quotes
                .Where(q => q.UserId == userId)
                .ToListAsync();
        }

        // GET: api/quotes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Quote>> GetQuote(int id)
        {
            int userId = GetCurrentUserId();
            var quote = await _context.Quotes.FindAsync(id);

            if (quote == null)
                return NotFound();

            if (quote.UserId != userId)
                return Forbid();

            return quote;
        }

        // POST: api/quotes
        [HttpPost]
        public async Task<ActionResult<Quote>> PostQuote(Quote quote)
        {
            int userId = GetCurrentUserId();
            quote.UserId = userId; // forced to be current Id, not trusted front-end UserId

            _context.Quotes.Add(quote);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetQuote), new { id = quote.Id }, quote);
        }

        // PUT: api/quotes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuote(int id, Quote quote)
        {
            // first check id is existing, then check if it is the current userId. a trade-off way 
            int userId = GetCurrentUserId();
            var existingQuote = await _context.Quotes.FindAsync(id);

            if (existingQuote == null)
            
                return NotFound();

            if (existingQuote.UserId != userId)
                return Forbid();

            existingQuote.Text = quote.Text;
            existingQuote.Author = quote.Author;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/quotes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuote(int id)
        {
            int userId = GetCurrentUserId();
            var quote = await _context.Quotes.FindAsync(id);

            if (quote == null)
                return NotFound();

            if (quote.UserId != userId)
                return Forbid();

            _context.Quotes.Remove(quote);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}