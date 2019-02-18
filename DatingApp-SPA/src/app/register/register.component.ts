// 42. Adding a component so users can Register to our site
import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
// 45. Adding the register method to the Auth Service
import { AuthService } from '../_services/auth.service';
// 53. Wrapping 3rd party libraries as an Angular service
import { AlertifyService } from '../_services/alertify.service';
// 121. Introduction to Reactive Forms in Angular
// 125. Using the Reactive Forms FormBuilder Service
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
// 127. Handling Dates in Forms
import { BsDatepickerConfig } from 'ngx-bootstrap';
// 129. Completing the Registration implementation
import { User } from '../_models/user';
// 129. Completing the Registration implementation
import { Router } from '@angular/router';


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
  // model: any = {};
  // 129. Completing the Registration implementation
  user: User;

  // 121. Introduction to Reactive Forms in Angular
  registerForm: FormGroup;

  // 127. Handling Dates in Forms
  bsConfig: Partial<BsDatepickerConfig>;

  // 45. Adding the register method to the Auth Service
  // constructor(private authService: AuthService) { }
  // constructor(private authService: AuthService, private alertify: AlertifyService) { }
  // 125. Using the Reactive Forms FormBuilder Service
  // constructor(private authService: AuthService, private alertify: AlertifyService, private fb: FormBuilder) { }
  // 129. Completing the Registration implementation
  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService, private fb: FormBuilder) { }

  ngOnInit() {
    // 121. Introduction to Reactive Forms in Angular
    // 122. Validation in Reactive forms
    // 123. Custom Validators in Reactive forms
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', Validators.required)
    // }, this.passwordMatchValidator);

    // 127. Handling Dates in Forms
    this.bsConfig = {
      containerClass: 'theme-red'
    };

    // 125. Using the Reactive Forms FormBuilder Service
    this.createRegisterForm();
  }

  // 125. Using the Reactive Forms FormBuilder Service
  // createRegisterForm() {
  //   this.registerForm = this.fb.group({
  //     username: ['', Validators.required],
  //     password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
  //     confirmPassword: ['', Validators.required]
  //   }, {validator: this.passwordMatchValidator});
  // }

  // 126. Expanding the Registration form
  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }


  // 123. Custom Validators in Reactive forms
  passwordMatchValidator(g: FormGroup) {
    // return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
  }


  // 45. Adding the register method to the Auth Service
  register() {
    // 121. Introduction to Reactive Forms in Angular
    // this.authService.register(this.model).subscribe(() => {
    //   // console.log('registration successful');
    //   // 53. Wrapping 3rd party libraries as an Angular service
    //   this.alertify.success('registration successful');
    // }, error => {
    //   // console.log(error);
    //   // 53. Wrapping 3rd party libraries as an Angular service
    //   this.alertify.error(error);
    // });

    // 121. Introduction to Reactive Forms in Angular
    // console.log(this.registerForm.value);

    // 129. Completing the Registration implementation
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Registration successful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }
  }

   cancel() {
    // 44. Component Communication Child to Parent using Output properties
    this.cancelRegister.emit(false);
    // console.log('cancelled');
    // 53. Wrapping 3rd party libraries as an Angular service
    this.alertify.message('cancelled');
  }


}
