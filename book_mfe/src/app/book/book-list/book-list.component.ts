// src/app/book/book-list/book-list.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-book-list',
  template: `
    <h2>Books List</h2>
    <ul>
      <li *ngFor="let book of books">{{ book.name }}</li>
    </ul>
  `,
})
export class BookListComponent {
  books = [
    { name: 'The Great Gatsby' },
    { name: '1984' },
    { name: 'To Kill a Mockingbird' },
  ];
}
