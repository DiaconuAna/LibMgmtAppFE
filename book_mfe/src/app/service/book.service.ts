import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost/book';
  private userUrl = 'http://localhost/user';

  constructor(private http: HttpClient) {}

  // Get the JWT token from sessionStorage
  getAuthToken(): string | null {
    return sessionStorage.getItem('jwt_token');
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

  borrowBook(bookId: number): Observable<any> {
    let userId = sessionStorage.getItem('user_id');
    const url = `${this.userUrl}/borrow`;
    console.log(url)
    const payload = { user_id: userId, book_id: bookId };
    console.log(payload)
    return this.http.post(`${this.userUrl}/borrow`, payload, this.getHttpOptions());
  }
}
