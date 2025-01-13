import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private userUrl = 'http://localhost/user'; // Replace with your Python backend's base URL
  private bookurl = 'http://localhost/book'; // Update with your backend URL


  constructor(private http: HttpClient) {}

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

  getUserProfile(): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.get(`${this.userUrl}/profile`, httpOptions);
  }

  addBook(book: any): Observable<any> {
    return this.http.post(`${this.bookurl}/add`, book, this.getHttpOptions());
  }
}
