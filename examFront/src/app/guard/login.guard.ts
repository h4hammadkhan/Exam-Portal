import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  constructor(private loginService: LoginService, private router: Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.loginService.isLoggedIn() && this.loginService.getRole()=='NORMAL'){
        this.router.navigate(['/user-dashboard']);
        return false;
      }
      else if(this.loginService.isLoggedIn() && this.loginService.getRole()=='ADMIN'){
        this.router.navigate(['/admin']);
        return false;
      }
      
      return true;
  }
  
}
