// 107. Creating the Photo upload component in Angular
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Photo } from 'src/app/_models/photo';

// 108. Adding a 3rd Party File Uploader
// https://valor-software.com/ng2-file-upload/
import { FileUploader } from 'ng2-file-upload';
// 108. Adding a 3rd Party File Uploader
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  // 107. Creating the Photo upload component in Angular
  @Input() photos: Photo[];
  // 113. Output properties revisited.
  @Output() getMemberPhotoChange = new EventEmitter<string>();

  // 108. Adding a 3rd Party File Uploader
  // https://valor-software.com/ng2-file-upload/
  // public uploader:FileUploader = new FileUploader({url: URL});
  // public hasBaseDropZoneOver:boolean = false;
  // public hasAnotherDropZoneOver:boolean = false;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  // 108. Adding a 3rd Party File Uploader
  baseUrl = environment.apiUrl;
  // 112. Using the array filter method to provide instant feedback in the SPA
  currentMain: Photo;

  // 111. Adding the Set Main Photo functionality to the SPA
  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    // 108. Adding a 3rd Party File Uploader
    this.initializeUploader();
  }

  // 108. Adding a 3rd Party File Uploader
  // https://valor-software.com/ng2-file-upload/
  // public fileOverBase(e:any):void {
  //   this.hasBaseDropZoneOver = e;
  // }
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  // 108. Adding a 3rd Party File Uploader
  // http://localhost:5000/api/users/1/photos
  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    // 109. Configuring the 3rd Party file uploader
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
    // 109. Configuring the 3rd Party file uploader
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
      }
    };
  }


  // 111. Adding the Set Main Photo functionality to the SPA
  setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
      // console.log('Successfuly set to main.');
      // 112. Using the array filter method to provide instant feedback in the SPA
      this.currentMain = this.photos.filter(p => p.isMain === true)[0];
      this.currentMain.isMain = false;
      photo.isMain = true;
      // 113. Output properties revisited.
      // this.getMemberPhotoChange.emit(photo.url);
      // 116. Using BehaviorSubject to add any to any communication to our app. - begin
      this.authService.changeMemberPhoto(photo.url);
      this.authService.currentUser.photoUrl = photo.url;
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
      // 116. Using BehaviorSubject to add any to any communication to our app. - end
    }, error => {
      this.alertify.error(error);
    });
  }

  // 118. Adding the Delete Photo functionality to the SPA
  deletePhoto(id: number) {
    this.alertify.confirm('Are you sure you want to delete this photo?', () => {
      this.userService.deletePhoto(this.authService.decodedToken.nameid, id).subscribe(() => {
        this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
        this.alertify.success('Photo has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the photo');
      });
    });
  }

}


