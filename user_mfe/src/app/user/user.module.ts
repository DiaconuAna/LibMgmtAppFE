import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    MainPageComponent,
    AddBookComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: MainPageComponent},
    ]),
    FormsModule,
  ]
})
export class UserModule { }
