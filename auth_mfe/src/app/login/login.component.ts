import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // Login properties
  loginUsername = '';
  loginPassword = '';

  // Registration properties
  registerUsername = '';
  registerName = '';
  registerPassword = '';
  registerRole = 'user'; // Default role is 'user'

  onLogin() {
    if (this.loginUsername && this.loginPassword) {
      // Mock login logic
      console.log('Login attempted with:', this.loginUsername, this.loginPassword);
      alert('Login successful!');
      localStorage.setItem('authToken', 'mock-jwt-token'); // Simulate token storage
    } else {
      alert('Please enter both username and password.');
    }
  }

  onRegister() {
    if (
      this.registerUsername &&
      this.registerName &&
      this.registerPassword &&
      this.registerRole
    ) {
      // Mock registration logic
      console.log('Register attempted with:', {
        username: this.registerUsername,
        name: this.registerName,
        password: this.registerPassword,
        role: this.registerRole,
      });
      alert('Registration successful!');
    } else {
      alert('Please fill in all fields.');
    }
  }
}
