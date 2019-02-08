import { Component, OnInit } from '@angular/core';
// 40. Injecting the Angular services in our Components
import { AuthService } from '../_services/Auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  // 38. Introduction to Angular template forms
  model: any = {};

  // 40. Injecting the Angular services in our Components
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  // 38. Introduction to Angular template forms
  // ================================================================
  // subscribe(observer?: PartialObserver<T>): Subscription;
  // subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription;
    // ================================================================
  login() {
    // 40. Injecting the Angular services in our Components
    this.authService.login(this.model).subscribe(
      next => {
      console.log('Logged in successfully');
    }, error => {
      // 50. Handling errors in Angular
      console.log(error);
    });
  }

  // 41. Using *ngIf to conditionally display HTML Elements
  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // 41. Using *ngIf to conditionally display HTML Elements
  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
  }

}
