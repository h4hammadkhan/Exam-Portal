import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  // add user
  public addUser(user:User){
    return this.http.post(`${baseUrl}/user/`,user);
  }

  //update user
  public updateUser(user:User):Observable<User>{
    return this.http.put<User>(`${baseUrl}/user/update/`,user);
  }
}
