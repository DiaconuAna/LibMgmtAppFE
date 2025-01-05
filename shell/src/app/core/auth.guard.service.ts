import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root',  // Ensures the guard is globally available
})
export class AuthGuard implements CanActivate{

  constructor(private router: Router, private jwtHelper: JwtHelperService){
  }

  canActivate(){
    const token = localStorage.getItem("jwt_token");

    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }

    this.router.navigate(['']);
    return false;
  }
}
