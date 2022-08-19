import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  
 
  category!:Category;

  cateForm!:FormGroup;

  
  
  constructor(private cateService: CategoryService,private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    this.cateForm = this.formBuilder.group({
      title:['',Validators.required],
      description:['',Validators.required],
    });
  }

  get getFields(){
    return this.cateForm.controls;
  }
  

  addCategory(){
    if(this.cateForm.invalid){
      return
    }
    // console.log(this.cateForm.value); 
    this.category = this.cateForm.value;
    this.cateService.addCategory(this.category).subscribe(
      (data:Category)=>{
        this.clr();
        Swal.fire("Success !!",`${data.title} category added Successfully`,'success');

      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!",'Server error !!','error');
      }
    )
    
  }

  clr(){
    this.cateForm.reset();
  }
}
