import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../service/user-service.service';
import {User} from '../model/user.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  userProfile: any;
  userRole: string | null = '';
  showAddBookForm = false;
  users: User[] = [];
  showUsers = false;
  showBorrowings = false;
  borrowings: any[] = [];

  constructor(private userService: UserServiceService) {}

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('user_role');
    this.userProfile = {
      name: "",
      username: "",
    };
    console.log("User role? ", this.userRole)
    this.userService.getUserProfile().subscribe(
      (response: any) => {
        this.userProfile = response;
        console.log('User Profile:', this.userProfile);
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  toggleAddBookForm() {
    this.showAddBookForm = !this.showAddBookForm;
  }

  onBookAdded() {
    alert('Book has been added successfully!');
    this.showAddBookForm = false; // Close the form after successful submission
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response.users;
        console.log(this.users)
        this.showUsers = true;
      },
      (error) => {
        console.error('Failed to fetch users:', error);
        alert('Could not fetch users. Please try again.');
      }
    );
  }

  fetchUserBorrowings(user_id : number) {
    this.userService.getBorrowings(user_id).subscribe(
      (response) => {
        this.borrowings = response; // Store borrowings in the local variable
        console.log('Borrowings:', response);
        this.showBorrowings = true;
      },
      (error) => {
        console.error('Failed to fetch borrowings:', error);
        // this.errorMessage = error.error?.msg || 'An error occurred while fetching borrowings';
      }
    );
  }

  returnBook(book: any){
    this.userService.returnBook(book.book_id).subscribe(
      (response) => {
        alert(`You have successfully returned the book: ${book.title}`);
        // Update the book's available copies count locally
        book.available_copies++;
        this.fetchUserBorrowings(this.userProfile.id);
      },
      (error) => {
        console.error('Failed to return book:', error);
        alert('Could not return the book. Please try again.');
      }
    );
  }

}
