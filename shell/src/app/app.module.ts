// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AuthGuard} from './core/auth.guard.service';
import { AppRoutingModule } from './app-routing.module';  // Import AppRoutingModule
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';  // Add these imports


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    { provide: JWT_OPTIONS, useValue: {} },  // Provide JWT_OPTIONS
    JwtHelperService,  // Provide JwtHelperService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
