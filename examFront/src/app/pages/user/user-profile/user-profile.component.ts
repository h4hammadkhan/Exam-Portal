import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { Userlogin} from 'src/app/model/userlogin';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  hide = true;
  user!:User;
  updateUserData!:User;
  userForm!:FormGroup;

  userlogin!:Userlogin;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private loginService: LoginService,
    private router: Router,
    private snack: MatSnackBar,
    ) { }
    
    // password:['',[Validators.required,Validators.minLength(8)]],
  ngOnInit() {
    this.user = this.loginService.getUser();
    
    this.userForm = this.formBuilder.group({
      id:['',Validators.required],
      userName:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(8)]],
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      phone:['',Validators.required],
    })

    this.userForm.patchValue({
      id:this.user.id,
      userName:this.user.userName,
      firstName:this.user.firstName,
      lastName:this.user.lastName,
      email:this.user.email,
      phone:this.user.phone,
    })

  }

  get getFields(){
    return this.userForm.controls;
  }

  setUseranmePassword(){
    this.userlogin = new Userlogin(this.getFields['userName'].value,this.getFields['password'].value);
  }

  updateUser(){
    if(this.userForm.invalid){
      return
    }

    this.updateUserData = this.userForm.value;
    this.userService.updateUser(this.updateUserData).subscribe(
      (data:User)=>{
        Swal.fire("Success !!","User updated !!","success").then((ok)=>{
          console.log(data);
        
          // set user name or password into userLogin class
          this.setUseranmePassword();
          console.log(this.userlogin);
          
          // logout 
          this.loginService.logout();
          // login again, it might be possible that users change there password and username after they no longer to use http calls  
          this.loginService.generateToken(this.userlogin).subscribe(
            (data:any)=>{
              console.log("success:",data);
              
              //Login... set token into local storage
              this.loginService.loginUser(data.token);
              console.log(this.loginService.getToken());
              
              //get current logged user
              this.loginService.getCurrentUser().subscribe(
                (user:any)=>{
                  this.loginService.setUser(user);
                  console.log(user);
                    //redirect ...ADMIN: admin-dashboard
                    //redirect ...NORMAL: user-dashboard
                  if(this.loginService.getRole()=='ADMIN'){
                    // redirecting... admin dashboard
                    this.router.navigate(['/admin/profile']);
                    this.loginService.loginStatusSubject.next(true);
                  }
                  else if(this.loginService.getRole()=='NORMAL'){
                    // redirecting... user dashboard
                    this.router.navigate(['/user-dashboard/profile']);
                    this.loginService.loginStatusSubject.next(true);
                      
                  }else{
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
                    
        });
      
     
      },
      (error)=>{
        Swal.fire("Error !!","Error in updating user !!","error");
        console.log(error);
      }
    );
    

  }

}
