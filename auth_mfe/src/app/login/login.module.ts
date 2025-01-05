import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // For two-way binding
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule, // Add HttpClientModule here for API calls
    RouterModule.forChild([
      { path: '', component: LoginComponent }, // Default route for the module
    ]),
  ],
})
export class LoginModule {}
