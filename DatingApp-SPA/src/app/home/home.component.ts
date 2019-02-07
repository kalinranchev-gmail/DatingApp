// 42. Adding a component so users can Register to our site
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  values: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
  }

  // 44. Component Communication Child to Parent using Output properties
  registerToggle() {
    this.registerMode = true;
  }

  // 43. Parent to Child Component communication using Input properties
  getValues() {
    this.http.get('http://localhost:5000/api/values').subscribe(
      response => {
        this.values = response;
      }, error => {
        console.log(error);
      });
  }

  // 44. Component Communication Child to Parent using Output properties
  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

}
