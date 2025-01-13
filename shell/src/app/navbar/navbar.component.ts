import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  logout(): void {
    // Clear tokens and user-related data
    localStorage.removeItem('jwt_token'); // Or sessionStorage.removeItem() if used
    localStorage.removeItem('user_role'); // Optional: Clear cached role if stored

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
