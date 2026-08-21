import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from './auth';

export interface BookModel {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class Book {
  private apiUrl = 'http://localhost:5101/api/books';

  constructor(private http: HttpClient, private authService: Auth) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
  }

  getBooks(): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  addBook(book: any): Observable<BookModel> {
    return this.http.post<BookModel>(this.apiUrl, book, { headers: this.getAuthHeaders() });
  }

  updateBook(id: number, book: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, book, { headers: this.getAuthHeaders() });
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}