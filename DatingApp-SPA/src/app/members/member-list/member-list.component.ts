import { Component, OnInit } from '@angular/core';
// 82. Retrieving the Members into the Member List Component
// 83. Creating Member Cards to display on our Member list page
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  // 82. Retrieving the Members into the Member List Component
  users: User[];

  // 82. Retrieving the Members into the Member List Component
  // constructor(private userService: UserService, private alertify: AlertifyService) { }
  // 90. Using Route Resolvers to retrieve data
  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.loadUsers();
    // 90. Using Route Resolvers to retrieve data
    this.route.data.subscribe(data => {
      // this.users = data['users'];
      this.users = data.users;
    });
  }

  // 82. Retrieving the Members into the Member List Component
  // 90. Using Route Resolvers to retrieve data
  // loadUsers() {
  //   this.userService.getUsers().subscribe((users: User[]) => {
  //     this.users = users;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

}
