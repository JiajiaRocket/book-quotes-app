import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Quote, QuoteModel } from '../../services/quote';

@Component({
  selector: 'app-my-quotes',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-quotes.html',
  styleUrl: './my-quotes.css',
})
export class MyQuotes implements OnInit {
  quotes: QuoteModel[] = [];

  newText = '';
  newAuthor = '';

  editingId: number | null = null;
  editText = '';
  editAuthor = '';

  constructor(private quoteService: Quote) {}

  ngOnInit() {
    this.loadQuotes();
  }

  loadQuotes() {
    this.quoteService.getQuotes().subscribe({
      next: (data) => {
        this.quotes = data;
      }
    });
  }

  addQuote() {
    const newQuote = {
      text: this.newText,
      author: this.newAuthor
    };
    this.quoteService.addQuote(newQuote).subscribe({
      next: () => {
        this.newText = '';
        this.newAuthor = '';
        this.loadQuotes();
      }
    });
  }

  startEdit(quote: QuoteModel) {
    this.editingId = quote.id;
    this.editText = quote.text;
    this.editAuthor = quote.author;
  }

  cancelEdit() {
    this.editingId = null;
  }

  saveEdit(id: number) {
    const updatedQuote = {
      text: this.editText,
      author: this.editAuthor
    };
    this.quoteService.updateQuote(id, updatedQuote).subscribe({
      next: () => {
        this.editingId = null;
        this.loadQuotes();
      }
    });
  }

  deleteQuote(id: number) {
    this.quoteService.deleteQuote(id).subscribe({
      next: () => {
        this.loadQuotes();
      }
    });
  }
}