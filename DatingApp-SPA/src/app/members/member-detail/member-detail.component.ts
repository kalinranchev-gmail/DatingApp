import { Component, OnInit } from '@angular/core';
// 87. Creating the Member Detailed View component class
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
// 91. Adding a photo gallery to our application
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  // 87. Creating the Member Detailed View component class
  user: User;
  // 91. Adding a photo gallery to our application
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.loadUser();
    // 90. Using Route Resolvers to retrieve data
    this.route.data.subscribe(data => {
      // this.user = data['user'];
      this.user = data.user;
    });

    // 91. Adding a photo gallery to our application
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true
      }
    ];
    this.galleryImages = this.getImages();
  }

  // 91. Adding a photo gallery to our application
  // ========================================================
  // const str = "hello world";
  // for (let i = 0; i < str.length; i++) {
  // [tslint] Expected a 'for-of' loop instead of a 'for' loop with this simple iteration (prefer-for-of)
  //   console.log(str[i]);
  // }
  // for (const chr of str) {
  // [ts] Using a string in a 'for...of' statement is only supported in ECMAScript 5 and higher.
  //   console.log(chr);
  // }
  // ========================================================
  // 91. Adding a photo gallery to our application
  getImages() {
    const imageUrls = [];

    // for (let i = 0; i < this.user.photos.length; i++) {
    //   imageUrls.push({
    //     small: this.user.photos[i].url,
    //     medium: this.user.photos[i].url,
    //     big: this.user.photos[i].url,
    //     description: this.user.photos[i].description
    //   });
    // }

    for (const photo of this.user.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description
      });
    }
    return imageUrls;
  }

  // 90. Using Route Resolvers to retrieve data
  // member/5
  // loadUser() {
  //   // this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user: User) => {
  //   this.userService.getUser(this.route.snapshot.params.id).subscribe((user: User) => {
  //     this.user = user;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }
}
