import { Component, OnInit } from '@angular/core';
// 40. Injecting the Angular services in our Components
import { AuthService } from '../_services/auth.service';
// 53. Wrapping 3rd party libraries as an Angular service
import { AlertifyService } from '../_services/alertify.service';
// 62. Using routing in our components
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  // 38. Introduction to Angular template forms
  model: any = {};

  // 40. Injecting the Angular services in our Components
  // constructor(private authService: AuthService) { }
  // 53. Wrapping 3rd party libraries as an Angular service
  // constructor(public authService: AuthService, private alertify: AlertifyService) { }
  // 62. Using routing in our components
  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  // 38. Introduction to Angular template forms
  // ================================================================
  // subscribe(observer?: PartialObserver<T>): Subscription;
  // subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription;
  // ================================================================
  login() {
    // 40. Injecting the Angular services in our Components
    this.authService.login(this.model).subscribe(next => {
      // console.log('Logged in successfully');
      // 53. Wrapping 3rd party libraries as an Angular service
      this.alertify.success('Logged in successfully');
    }, error => {
      // 50. Handling errors in Angular
      // console.log(error);
      // 53. Wrapping 3rd party libraries as an Angular service
      this.alertify.error(error);
      // 62. Using routing in our components
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  // 41. Using *ngIf to conditionally display HTML Elements
  loggedIn() {
    // const token = localStorage.getItem('token');
    // return !!token;
    // 54. Using the Angular JWT library to improve token handling
    return this.authService.loggedIn();
  }

  // 41. Using *ngIf to conditionally display HTML Elements
  logout() {
    localStorage.removeItem('token');
    // console.log('logged out');
    // 53. Wrapping 3rd party libraries as an Angular service
    this.alertify.message('logged out');
    // 62. Using routing in our components
    this.router.navigate(['/home']);
  }

}
