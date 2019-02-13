// 94. Creating a Member Edit Component
// 96. Creating the Member Edit Template part 2
// 97. Adding a CanDeactivate route guard
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
// 96. Creating the Member Edit Template part 2
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  // 96. Creating the Member Edit Template part 2
  @ViewChild('editForm') editForm: NgForm;
  user: User;

  // 97. Adding a CanDeactivate route guard
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  // 96. Creating the Member Edit Template part 2
  // 99. Finishing off the Member edit component
  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
              private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      // this.user = data['user'];
      this.user = data.user;
    });
  }

  // 96. Creating the Member Edit Template part 2
  updateUser() {
    // console.log(this.user);
    // this.alertify.success('Profile updated successfully');
    // this.editForm.reset(this.user);
    // 99. Finishing off the Member edit component
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('Profile updated successfully');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
  }

}
