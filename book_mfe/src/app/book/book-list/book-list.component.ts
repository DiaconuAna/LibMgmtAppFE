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
    this.userRole = sessionStorage.getItem('user_role');
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
        // Handle success or specific status codes from the backend
        if (response.msg) {
          if (response.msg.includes("No copies available")) {
            alert(`Book "${book.title}" is not available for borrowing.`);
          } else if (response.msg.includes("already borrowed")) {
            alert(`You have already borrowed the book: "${book.title}".`);
          } else {
            alert(`You have successfully borrowed the book: "${book.title}".`);
            // Update the book's available copies count locally
            book.available_copies--;
          }
        } else {
          alert('An unexpected success response was received.');
        }
      },
      (error) => {
        // Handle failure based on HTTP status codes
        if (error.status === 404) {
          alert('The book you are trying to borrow was not found.');
        } else if (error.status === 409) {
          alert('You have already borrowed this book.');
        } else if (error.status === 500) {
          alert('An unexpected error occurred on the server. Please try again later.');
        } else {
          alert('Could not borrow the book. Please try again.');
        }
        console.error('Failed to borrow book:', error);
      }
    );
  }


}
