import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true
  loginForm!:FormGroup;



  constructor(private formBuilder: FormBuilder, private loginService:LoginService, private router: Router, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ["",Validators.required],
      password: ["",Validators.required]
    })
  }

  get getFields(){
    return this.loginForm.controls;
  }

  clr(){
    this.loginForm.reset();
  }

  onLogin(){
    if(this.loginForm.invalid){
      return;
    }
    
    console.log(this.loginForm.value);
   
    // request to server to generate token
    this.loginService.generateToken(this.loginForm.value).subscribe(
      (data:any)=>{
        console.log("success:",data);
        
        //Login... set token into local storage
        this.loginService.loginUser(data.token);
        //get current logged user
        this.loginService.getCurrentUser().subscribe(
          (user:any)=>{
               this.loginService.setUser(user);
               console.log(user);
               //redirect ...ADMIN: admin-dashboard
               //redirect ...NORMAL: user-dashboard
               if(this.loginService.getRole()=='ADMIN'){
                // redirecting... admin dashboard
                this.router.navigate(['/admin']);
                this.loginService.loginStatusSubject.next(true);
               }
               else if(this.loginService.getRole()=='NORMAL'){
                // redirecting... user dashboard
                this.router.navigate(['/user-dashboard']);
                this.loginService.loginStatusSubject.next(true);


               }
               else{
                this.loginService.logout()
               }
          },
          (err)=>{
            console.log(err);
          }
        );
      },
      (error)=>{
        console.log("error:",error);
        this.snack.open('Invalid Details !! Try again','',{
          duration: 3000,
        });           
      }
    );
    
  }

}
