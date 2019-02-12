// 81. Creating another Angular service
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

// 'Authorization': 'Bearer ' + localStorage.getItem('token')

// 86. Using Auth0 JwtModule to send up jwt tokens automatically
// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    // return this.http.get<User[]>(this.baseUrl + 'users', httpOptions);
    // 86. Using Auth0 JwtModule to send up jwt tokens automatically
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  getUser(id): Observable<User> {
    // return this.http.get<User>(this.baseUrl + 'users/' + id, httpOptions);
    // 86. Using Auth0 JwtModule to send up jwt tokens automatically
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }
}
