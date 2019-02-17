import { Component, OnInit } from '@angular/core';
// 54. Using the Angular JWT library to improve token handling
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';
import { User } from './_models/user';

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
    // 114. Adding the main photo to the Nav bar
    const user = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }

    // 114. Adding the main photo to the Nav bar
    if (user) {
      this.authService.currentUser = user;
      // 116. Using BehaviorSubject to add any to any communication to our app.
      this.authService.changeMemberPhoto(user.photoUrl);
    }

  }
}
