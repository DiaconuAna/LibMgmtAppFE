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

  constructor(private userService: UserServiceService) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('user_role');
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

  closeUsers() {
    this.showUsers = false;
  }

}
