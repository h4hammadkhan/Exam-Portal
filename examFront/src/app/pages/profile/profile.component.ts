import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!:User;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.user = this.loginService.getUser();
  }

}
