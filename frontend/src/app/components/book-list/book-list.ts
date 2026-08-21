import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book, BookModel } from '../../services/book';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList implements OnInit {
  books: BookModel[] = [];

  newTitle = '';
  newAuthor = '';
  newPublishedDate = '';

  editingId: number | null = null;
  editTitle = '';
  editAuthor = '';
  editPublishedDate = '';

  constructor(private bookService: Book) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
      }
    });
  }

  addBook() {
    const newBook = {
      title: this.newTitle,
      author: this.newAuthor,
      publishedDate: this.newPublishedDate
    };
    this.bookService.addBook(newBook).subscribe({
      next: () => {
        this.newTitle = '';
        this.newAuthor = '';
        this.newPublishedDate = '';
        this.loadBooks();
      }
    });
  }

  startEdit(book: BookModel) {
    this.editingId = book.id;
    this.editTitle = book.title;
    this.editAuthor = book.author;
    this.editPublishedDate = book.publishedDate;
  }

  cancelEdit() {
    this.editingId = null;
  }

  saveEdit(id: number) {
    const updatedBook = {
      id: id,
      title: this.editTitle,
      author: this.editAuthor,
      publishedDate: this.editPublishedDate
    };
    this.bookService.updateBook(id, updatedBook).subscribe({
      next: () => {
        this.editingId = null;
        this.loadBooks();
      }
    });
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.loadBooks();
      }
    });
  }
}