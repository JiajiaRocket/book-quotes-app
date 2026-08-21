import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from './auth';

export interface QuoteModel {
  id: number;
  text: string;
  author: string;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class Quote {
  private apiUrl = 'http://localhost:5101/api/quotes';

  constructor(private http: HttpClient, private authService: Auth) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
  }

  getQuotes(): Observable<QuoteModel[]> {
    return this.http.get<QuoteModel[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  addQuote(quote: any): Observable<QuoteModel> {
    return this.http.post<QuoteModel>(this.apiUrl, quote, { headers: this.getAuthHeaders() });
  }

  updateQuote(id: number, quote: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, quote, { headers: this.getAuthHeaders() });
  }

  deleteQuote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}