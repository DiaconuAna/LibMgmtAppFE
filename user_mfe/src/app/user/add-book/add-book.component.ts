import { Component, EventEmitter, Output } from '@angular/core';
import { UserServiceService } from '../../service/user-service.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent {
  newBook = {
    title: '',
    author: '',
    isbn: '',
    availableCopies: 1,
  };

  @Output() bookAdded = new EventEmitter<void>();

  constructor(private service: UserServiceService) {}

  onSubmit() {
    this.service.addBook(this.newBook).subscribe(
      (response) => {
        alert('Book added successfully!');
        this.bookAdded.emit(); // Notify the parent component
        this.newBook = {
          title: '',
          author: '',
          isbn: '',
          availableCopies: 1,
        };
      },
      (error) => {
        alert('Failed to add book: ' + error.error.msg);
      }
    );
  }
}
