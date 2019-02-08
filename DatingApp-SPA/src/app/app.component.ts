import { Component, OnInit } from '@angular/core';
// 54. Using the Angular JWT library to improve token handling
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './_services/Auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent {
//   title = 'DatingApp-SPA';
// }
// 54. Using the Angular JWT library to improve token handling
export class AppComponent implements OnInit {
  title = 'Dating App';
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
}
