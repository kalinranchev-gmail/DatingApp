import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// 15. Making HTTP requests in Angular
import {HttpClientModule} from '@angular/common/http';
// 38. Introduction to Angular template forms
// 121. Introduction to Reactive Forms in Angular
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// 56. Adding Ngx Bootstrap to power our Bootstrap components
// 89. Adding a tabbed panel for the right hand side of the Member detailed page
// 127. Handling Dates in Forms
// 141. Using nix-bootstrap pagination module
// 146. Adding the Sorting functionality to the SPA + , ButtonsModule }
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
// 60. Setting up routing in Angular
import { RouterModule } from '@angular/router';
// 86. Using Auth0 JwtModule to send up jwt tokens automatically
import { JwtModule } from '@auth0/angular-jwt';
// 91. Adding a photo gallery to our application
import { NgxGalleryModule } from 'ngx-gallery';
// 108. Adding a 3rd Party File Uploader
import { FileUploadModule } from 'ng2-file-upload';
// 133. Using a TimeAgo pipe for dates in Angular
import {TimeAgoPipe} from 'time-ago-pipe';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';
// 39. Introduction to Angular Services
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
// 50. Handling errors in Angular
import { ErrorInterceptorProvider } from './_services/error.interceptor';
// 53. Wrapping 3rd party libraries as an Angular service
import { AlertifyService } from './_services/alertify.service';
// 60. Setting up routing in Angular
// 83. Creating Member Cards to display on our Member list page
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
// 63. Protecting our routes with a route guard
import { AuthGuard } from './_guards/auth.guard';
// 81. Creating another Angular service
import { UserService } from './_services/user.service';
// 83. Creating Member Cards to display on our Member list page
import { MemberCardComponent } from './members/member-card/member-card.component';
// 87. Creating the Member Detailed View component class
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
// 90. Using Route Resolvers to retrieve data
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
// 90. Using Route Resolvers to retrieve data
import { MemberListResolver } from './_resolvers/member-list.resolver';
// 94. Creating a Member Edit Component
import { MemberEditComponent } from './members/member-edit/member-edit.component';
// 94. Creating a Member Edit Component
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
// 97. Adding a CanDeactivate route guard
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
// 107. Creating the Photo upload component in Angular
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
// 154. Creating the Lists component
import { ListsResolver } from './_resolvers/lists.resolver';
// 163. Working with the message component in the SPA
import { MessagesResolver } from './_resolvers/messages.resolver';
// 165. Getting the message thread in the component
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';




// 86. Using Auth0 JwtModule to send up jwt tokens automatically
export function getToken() {
   return localStorage.getItem('token');
 }


@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      PhotoEditorComponent,
      TimeAgoPipe,
      MemberMessagesComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      ButtonsModule.forRoot(),
      PaginationModule.forRoot(),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      FileUploadModule,
      JwtModule.forRoot({
         config: {
           tokenGetter: getToken,
           whitelistedDomains: ['localhost:5000'],
           blacklistedRoutes: ['localhost:5000/api/auth']
         }
       })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      UserService,
      MemberDetailResolver,
      MemberListResolver,
      MemberEditResolver,
      PreventUnsavedChangesGuard,
      ListsResolver,
      MessagesResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
