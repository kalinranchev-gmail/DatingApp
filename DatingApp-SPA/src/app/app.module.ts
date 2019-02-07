import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// 15. Making HTTP requests in Angular
import {HttpClientModule} from '@angular/common/http';
// 38. Introduction to Angular template forms
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';
// 39. Introduction to Angular Services
import { AuthService } from './_services/Auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule
   ],
   providers: [
      AuthService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
