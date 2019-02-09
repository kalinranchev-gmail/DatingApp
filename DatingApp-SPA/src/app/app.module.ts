import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// 15. Making HTTP requests in Angular
import {HttpClientModule} from '@angular/common/http';
// 38. Introduction to Angular template forms
import {FormsModule} from '@angular/forms';
// 56. Adding Ngx Bootstrap to power our Bootstrap components
import { BsDropdownModule } from 'ngx-bootstrap';
// 60. Setting up routing in Angular
import { RouterModule } from '@angular/router';

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
import { MemberListComponent } from './member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
// 63. Protecting our routes with a route guard
import { AuthGuard } from './_guards/auth.guard';



@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
