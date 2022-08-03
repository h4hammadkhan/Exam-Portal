import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user!:User;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    // when refresh, data will same
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUser();

    // when login, data will change 
    this.loginService.loginStatusSubject.asObservable().subscribe((data)=>{
      this.isLoggedIn = this.loginService.isLoggedIn();
      this.user = this.loginService.getUser();
    })
  }

  logout(){
    this.loginService.logout();
    this.loginService.loginStatusSubject.next(false);
    this.router.navigate(['login']);
  }
}
