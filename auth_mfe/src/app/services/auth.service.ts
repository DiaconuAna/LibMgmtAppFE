import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.post(`${this.baseUrl}/login`, body);
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


}
