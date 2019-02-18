
// 39. Introduction to Angular Services
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// 116. Using BehaviorSubject to add any to any communication to our app.
import {BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
// 54. Using the Angular JWT library to improve token handling
import { JwtHelperService } from '@auth0/angular-jwt';
// 81. Creating another Angular service
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

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

  // 114. Adding the main photo to the Nav bar
  currentUser: User;

  // 116. Using BehaviorSubject to add any to any communication to our app.
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();


  constructor(private http: HttpClient) { }

  // 116. Using BehaviorSubject to add any to any communication to our app.
  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  // 39. Introduction to Angular Services
  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          // 114. Adding the main photo to the Nav bar
          localStorage.setItem('user', JSON.stringify(user.user));
          // 55. Using the Angular JWT library to decode tokens
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          // 114. Adding the main photo to the Nav bar
          this.currentUser = user.user;

          // console.log(this.decodedToken);
          // 116. Using BehaviorSubject to add any to any communication to our app.
          this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      })
    );
  }

  // 45. Adding the register method to the Auth Service
  // register(model: any) {
  //   return this.http.post(this.baseUrl + 'register', model);
  // }

  // 129. Completing the Registration implementation
  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  // 54. Using the Angular JWT library to improve token handling
  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
