
// 39. Introduction to Angular Services
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// 54. Using the Angular JWT library to improve token handling
import { JwtHelperService } from '@auth0/angular-jwt';
// 81. Creating another Angular service
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // baseUrl = 'http://localhost:5000/api/auth/';
  // 81. Creating another Angular service
  baseUrl = environment.apiUrl + 'auth/';
  // 54. Using the Angular JWT library to improve token handling
  jwtHelper = new JwtHelperService();
  // 55. Using the Angular JWT library to decode tokens
  decodedToken: any;

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          // 55. Using the Angular JWT library to decode tokens
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          console.log(this.decodedToken);
        }
      })
    );
  }

  // 45. Adding the register method to the Auth Service
  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  // 54. Using the Angular JWT library to improve token handling
  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
