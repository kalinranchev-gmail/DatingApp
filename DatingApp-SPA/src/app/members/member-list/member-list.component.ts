import { Component, OnInit } from '@angular/core';
// 82. Retrieving the Members into the Member List Component
// 83. Creating Member Cards to display on our Member list page
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
// 141. Using nix-bootstrap pagination module
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  // 82. Retrieving the Members into the Member List Component
  users: User[];
  // 144. Adding filtering functionality to the SPA - begin
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
  userParams: any = {};
  // 144. Adding filtering functionality to the SPA - end
  // 141. Using nix-bootstrap pagination module
  pagination: Pagination;

  // 82. Retrieving the Members into the Member List Component
  // constructor(private userService: UserService, private alertify: AlertifyService) { }
  // 90. Using Route Resolvers to retrieve data
  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.loadUsers();
    // 90. Using Route Resolvers to retrieve data
    this.route.data.subscribe(data => {
      // this.users = data['users'];
      // this.users = data.users;

      // 140. Setting up pagination in the SPA
      // this.users = data['users'].result;
      this.users = data.users.result;
      // 141. Using nix-bootstrap pagination module
      // this.pagination = data['users'].pagination;
      this.pagination = data.users.pagination;

      // 144. Adding filtering functionality to the SPA
      this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
      this.userParams.minAge = 18;
      this.userParams.maxAge = 99;
      // 146. Adding the Sorting functionality to the SPA
      this.userParams.orderBy = 'lastActive';
    });
  }

  // 141. Using nix-bootstrap pagination module
  // https://valor-software.com/ngx-bootstrap/#/pagination#page-changed-event
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    // console.log(this.pagination.currentPage);
    this.loadUsers();
  }

  // 144. Adding filtering functionality to the SPA
  resetFilters() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    // 146. Adding the Sorting functionality to the SPA
    this.userParams.orderBy = 'lastActive';
    this.loadUsers();
  }

  // 141. Using nix-bootstrap pagination module
  // 144. Adding filtering functionality to the SPA + , this.userParams)
  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
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
