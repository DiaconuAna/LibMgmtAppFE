// src/app/app.component.ts (Book Remote)
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Welcome to the Book Micro Frontend</h1>
    <router-outlet></router-outlet> <!-- Outlet for routing to book-related components -->
  `,
})
export class AppComponent {}
