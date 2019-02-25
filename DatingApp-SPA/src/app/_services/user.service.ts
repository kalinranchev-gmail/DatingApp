// 81. Creating another Angular service
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
// 140. Setting up pagination in the SPA
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

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

   // 86. Using Auth0 JwtModule to send up jwt tokens automatically
  // getUsers(): Observable<User[]> {
  //   // return this.http.get<User[]>(this.baseUrl + 'users', httpOptions)
  //   return this.http.get<User[]>(this.baseUrl + 'users');
  // }

  // 140. Setting up pagination in the SPA
  // 144. Adding filtering functionality to the SPA + , userParams?)
  // 154. Creating the Lists component + likesParam?)
  getUsers(page?, itemsPerPage?, userParams?, likesParam?): Observable<PaginatedResult<User[]>> {

    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    // 144. Adding filtering functionality to the SPA + userParams
    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      // 146. Adding the Sorting functionality to the SPA
      params = params.append('orderBy', userParams.orderBy);
    }

    // 154. Creating the Lists component - begin
    if (likesParam === 'Likers') {
      params = params.append('Likers', 'true');
    }

    if (likesParam === 'Likees') {
      params = params.append('Likees', 'true');
    }
    // 154. Creating the Lists component - end

    return this.http.get<User[]>(this.baseUrl + 'users', { observe: 'response', params }).pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }


  // 86. Using Auth0 JwtModule to send up jwt tokens automatically
  getUser(id): Observable<User> {
    // return this.http.get<User>(this.baseUrl + 'users/' + id, httpOptions);
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  // 99. Finishing off the Member edit component
  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  // 111. Adding the Set Main Photo functionality to the SPA
  setMainPhoto(userId: number, id: number) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
  }

  // 118. Adding the Delete Photo functionality to the SPA
  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }

  // 153. Adding the Send like functionality to the SPA
  sendLike(id: number, recipientId: number) {
    return this.http.post(this.baseUrl + 'users/' + id + '/like/' + recipientId, {});
  }

}
