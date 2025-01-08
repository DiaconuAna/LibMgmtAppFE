import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../service/user-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  userProfile: any;
  userRole: string | null = '';

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
}
