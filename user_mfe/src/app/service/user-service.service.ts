import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { GetUsersResponse } from '../user/model/user.model';


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

  getUsers(): Observable<GetUsersResponse> {
    return this.http.get<GetUsersResponse>(`${this.userUrl}/users`, this.getHttpOptions());
  }

  getBorrowings(userId: number): Observable<any[]> {

   let url = `http://localhost:3000/dev/user/borrowings?user_id=${userId}`
    let url2 = `http://localhost/user/borrowings?user_id=${userId}`
    let url3 = `http://192.168.176.136/user/borrowings?user_id=${userId}`
    return this.http.get<any>(url, this.getHttpOptions());
  }

  returnBook(book: number): Observable<any>{
    let userId = localStorage.getItem('user_id');
    const payload = { user_id: userId, book_id: book };
    console.log(payload)
    return this.http.post(`${this.userUrl}/return`, payload, this.getHttpOptions());
  }
}
