import { Component, OnInit } from '@angular/core';
// 15. Making HTTP requests in Angular
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {

  // 15. Making HTTP requests in Angular - begin
  // constructor() { }
  // ngOnInit() {
  // }

  values: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    this.http.get('http://localhost:5000/api/values').subscribe(
      response => {
        this.values = response;
      }, error => {
        console.log(error);
      });
  }
  // 15. Making HTTP requests in Angular - end

}
