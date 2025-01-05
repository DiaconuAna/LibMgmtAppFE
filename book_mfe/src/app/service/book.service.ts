import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost/book'; // Adjust this to your backend URL

  constructor(private http: HttpClient) {}

  // Get the JWT token from localStorage
  getAuthToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  // Set up the Authorization header with JWT token
  getHttpOptions(): { headers: HttpHeaders } {
    const token = this.getAuthToken();
    return {
      headers: new HttpHeaders({
        'Authorization': token ? `Bearer ${token}` : '',
      }),
    };
  }

  // Get all books with JWT token authorization
  getAllBooks(): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.get(`${this.apiUrl}/all_books`, httpOptions);
  }
}
