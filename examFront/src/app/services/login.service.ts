import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../model/user';
import { Userlogin } from '../model/userlogin';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

public loginStatusSubject = new Subject<boolean>();

constructor(private http:HttpClient) { }

  // get current user: which is logged in
  public getCurrentUser(): Observable<User>{
    return this.http.get<User>(`${baseUrl}/current-user`);
  }

  //generate token
  public generateToken(loginData:Userlogin){
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  // login user: set token in localStorage
  public loginUser(token: string){
    localStorage.setItem('token',token);
    return true;
  }

  //islogin: user is logged in or not
  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }
    else{
      return true;
    }
  }

  //logout: remove token from local storage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //get token
  public getToken(){
    return localStorage.getItem('token');
  }

  //set userDetails
  public setUser(user:User){
    localStorage.setItem('user',JSON.stringify(user));
  }

  //getUser
  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr !=null){
      return JSON.parse(userStr);
    }
    else{
      this.logout();
      return null;
    }
  }

  //get user role
  public getRole(){
    let userRole = this.getUser();
    return userRole.authorities[0].authority;
  }

}
