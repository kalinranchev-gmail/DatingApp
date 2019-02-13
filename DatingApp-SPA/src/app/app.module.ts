import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// 15. Making HTTP requests in Angular
import {HttpClientModule} from '@angular/common/http';
// 38. Introduction to Angular template forms
import {FormsModule} from '@angular/forms';
// 56. Adding Ngx Bootstrap to power our Bootstrap components
// 89. Adding a tabbed panel for the right hand side of the Member detailed page
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
// 60. Setting up routing in Angular
import { RouterModule } from '@angular/router';
// 86. Using Auth0 JwtModule to send up jwt tokens automatically
import { JwtModule } from '@auth0/angular-jwt';
// 91. Adding a photo gallery to our application
import { NgxGalleryModule } from 'ngx-gallery';


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
      MemberEditComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
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
      PreventUnsavedChangesGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
