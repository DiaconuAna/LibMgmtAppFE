import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginUsername = '';
  loginPassword = '';

  registerUsername = '';
  registerPassword = '';
  registerName = '';
  registerRole = 'user'; // Default role

  constructor(private authService: AuthService) {}

  onLogin(): void {
    this.authService.login(this.loginUsername, this.loginPassword).subscribe(
      (response: { msg: any; access_token: string; }) => {
        alert(response.msg); // Display success message
        localStorage.setItem('access_token', response.access_token); // Store JWT token
      },
      (error: { error: { msg: any; }; }) => {
        alert(error.error.msg); // Display error message
      }
    );
  }

  onRegister(): void {
    this.authService
      .register(
        this.registerUsername,
        this.registerPassword,
        this.registerName,
        this.registerRole
      )
      .subscribe(
        (response: { msg: any; }) => {
          alert(response.msg); // Display success message
          this.clearRegistrationForm(); // Clear form fields
        },
        (error: { error: { msg: any; }; }) => {
          alert(error.error.msg); // Display error message
        }
      );
  }

  clearRegistrationForm(): void {
    this.registerUsername = '';
    this.registerPassword = '';
    this.registerName = '';
    this.registerRole = 'user';
  }
}
