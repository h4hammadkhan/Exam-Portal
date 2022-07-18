import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

//exp 1
import { FormGroup,  FormBuilder,  Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide = true;
  userForm!: FormGroup;
  submitted = false;


  user!: User;

  constructor(
    private userservice: UserService,
    private snack: MatSnackBar,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    // validations
    this.userForm = this.formBuilder.group({
      userName:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(8)]],
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      phone:['',Validators.required],
    })
   
  }

  get fields(){
    return this.userForm.controls;
  }

  clr(){
    this.userForm = this.formBuilder.group({
      userName:'',
      password:'',
      firstName:'',
      lastName:'',
      email:'',
      phone:'',
    })
  }

  onSubmit(){
    this.submitted = true

    if(this.userForm.invalid){
      return 
    }
    // alert("success");
    // console.log(this.userForm.value);
    this.user = this.userForm.value;
    // console.log(this.user);

    this.userservice.addUser(this.user).subscribe(
      (data:any)=>{
        console.log(data);
        // alert("Success");
        Swal.fire("successfully Done !!",`${data.userName} is registered `,"success");
      },
      (error)=>{
        console.log(error);
        // alert("Something Went Wrong!!");
        this.snack.open("Something Went Wrong !!",'ok',{
          duration:3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        })
      }
    )
    
    
  }



}
