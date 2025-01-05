import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost/auth'; // Replace with your backend's base URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = {
      username: username, // Matches the backend expected keys
      password: password,
    };
    // return this.http.post(`${this.baseUrl}/login`, body);
    return this.http.post(`${this.baseUrl}/login`, body).pipe(
      // Handle the response after successful login
      tap((response: any) => {
        if (response?.access_token) {
          console.log('Login success: token is ', response.access_token)
          this.storeToken(response.access_token);  // Store token in localStorage
        } else {
          console.error('Login failed: No token in response');
        }
      })
    );
  }

  register(username: string, password: string, name: string, role: string): Observable<any> {
    const body = {
      username: username,
      password: password,
      name: name,
      role: role,
    };

    return this.http.post(`${this.baseUrl}/register`, body);
  }

  // Store JWT token
  storeToken(token: string): void {
    localStorage.setItem('jwt_token', token);  // Use sessionStorage if token should be cleared on tab close
  }

  // Get JWT token
  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  // Remove JWT token
  removeToken(): void {
    localStorage.removeItem('jwt_token');
  }

}
