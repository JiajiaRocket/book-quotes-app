// build the book and its attributes 
namespace backend.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public DateOnly PublishedDate { get; set; }
    }
}