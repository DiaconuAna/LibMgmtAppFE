// src/app/book/book.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
// import { BookDetailComponent } from './book-detail/book-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BookListComponent],  // todo - add BookDetailComponent once it's done
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'books', component: BookListComponent },        // Route for listing books
      // { path: 'books/:id', component: BookDetailComponent },  // Route for book details
    ]),
  ],
})
export class BookModule {}
