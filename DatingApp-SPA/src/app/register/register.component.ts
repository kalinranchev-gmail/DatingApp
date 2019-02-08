// 42. Adding a component so users can Register to our site
import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
// 45. Adding the register method to the Auth Service
import { AuthService } from '../_services/Auth.service';
// 53. Wrapping 3rd party libraries as an Angular service
import { AlertifyService } from '../_services/alertify.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // 43. Parent to Child Component communication using Input properties
  // @Input() valuesFromHome: any;
  // 44. Component Communication Child to Parent using Output properties
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  // 45. Adding the register method to the Auth Service
  // constructor(private authService: AuthService) { }
  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  // 45. Adding the register method to the Auth Service
  register() {
    this.authService.register(this.model).subscribe(() => {
      // console.log('registration successful');
      // 53. Wrapping 3rd party libraries as an Angular service
      this.alertify.success('registration successful');
    }, error => {
      // console.log(error);
      // 53. Wrapping 3rd party libraries as an Angular service
      this.alertify.error(error);
    });
  }

   cancel() {
    // 44. Component Communication Child to Parent using Output properties
    this.cancelRegister.emit(false);
    // console.log('cancelled');
    // 53. Wrapping 3rd party libraries as an Angular service
    this.alertify.message('cancelled');
  }


}
