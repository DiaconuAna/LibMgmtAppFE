import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { GetUsersResponse } from '../user/model/user.model';


@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private userUrl = 'http://localhost/user';
  private bookurl = 'http://localhost/book';
  private faasurl = 'http://localhost:3000/dev/user/borrowings';

  constructor(private http: HttpClient) {}

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

  getUserProfile(): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.get(`${this.userUrl}/profile`, httpOptions);
  }

  addBook(book: any): Observable<any> {
    return this.http.post(`${this.bookurl}/add`, book, this.getHttpOptions());
  }

  getUsers(): Observable<GetUsersResponse> {
    return this.http.get<GetUsersResponse>(`${this.userUrl}/users`, this.getHttpOptions());
  }

  getBorrowings(userId: number): Observable<any[]> {
    return this.http.get<any>(`${this.faasurl}?user_id=${userId}`, this.getHttpOptions());
  }

  returnBook(book: number): Observable<any>{
    let userId = sessionStorage.getItem('user_id');
    const payload = { user_id: userId, book_id: book };
    return this.http.post(`${this.userUrl}/return`, payload, this.getHttpOptions());
  }
}
