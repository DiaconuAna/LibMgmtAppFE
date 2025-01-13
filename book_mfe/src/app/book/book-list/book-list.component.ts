import { Component, OnInit } from '@angular/core';
import { BookService } from '../../service/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  errorMessage: string = '';
  userRole: string | null = '';


  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.fetchBooks();
    this.userRole = localStorage.getItem('user_role');
  }

  fetchBooks(): void {
    this.bookService.getAllBooks().subscribe(
      (response) => {
        this.books = response.books; // Assume response contains the books
      },
      (error) => {
        this.errorMessage = error.error.msg || 'An error occurred while retrieving books.';
      }
    );
  }

  borrowBook(book: any) {
    this.bookService.borrowBook(book.id).subscribe(
      (response) => {
        alert(`You have successfully borrowed the book: ${book.title}`);
        // Update the book's available copies count locally
        book.available_copies--;
      },
      (error) => {
        console.error('Failed to borrow book:', error);
        alert('Could not borrow the book. Please try again.');
      }
    );
  }

}
