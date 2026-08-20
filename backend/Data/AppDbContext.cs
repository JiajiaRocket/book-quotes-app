using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; } //inform the database that we have a table called Books
        public DbSet<User> Users { get; set; } //inform the database that we have a table called Users
        public DbSet<Quote> Quotes { get; set; } //inform the database that we have a table called Quotes
    }
}