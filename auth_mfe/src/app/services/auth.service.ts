import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import { jwtDecode } from 'jwt-decode';

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
          this.storeToken(response.access_token);  // Store token in sessionStorage
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
    sessionStorage.setItem('jwt_token', token);  // Use sessionStorage if token should be cleared on tab close
  }

  // Get JWT token
  getToken(): string | null {
    return sessionStorage.getItem('jwt_token');
  }

  getUserRole(): string {
    const token = sessionStorage.getItem('jwt_token');  // Assuming JWT token is stored in sessionStorage

    if (!token) {
      return '';  // No token, return empty string or handle accordingly
    }

    try {
      const decodedToken: any = jwtDecode(token);  // Decode the JWT token
      sessionStorage.setItem('user_role', decodedToken.role || '');
      sessionStorage.setItem('user_id', decodedToken.id || '');
      console.log("user role is: ", sessionStorage.getItem('user_role'))
      console.log("user id is: ", sessionStorage.getItem('user_id'))
      return decodedToken.role || '';  // Assuming 'role' is the claim in the token
    } catch (error) {
      console.error('Error decoding token', error);
      return '';  // Handle the case where decoding fails
    }
  }
}
