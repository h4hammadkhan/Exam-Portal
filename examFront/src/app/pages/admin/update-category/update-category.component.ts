import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  updateCateForm!:FormGroup;
  categoryId!:number;
  category!:Category;

  constructor(
    private formBuilder:FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cateService:CategoryService,
  ) { }

  ngOnInit() {
    this.categoryId = this.activatedRoute.snapshot.params['id'];
    // alert(this.categoryId);

    this.updateCateForm = this.formBuilder.group({
      id:[this.categoryId,Validators.required],
      title:['',Validators.required],
      description:['',Validators.required],
    })

    //get/ set category data to the updateCateForm for update
    this.getCategorySetForm();



  }

  get getFields(){
    return this.updateCateForm.controls;
  }



  //get/ set category data to the updateCateForm for update
  getCategorySetForm(){
    this.cateService.getCategory(this.categoryId).subscribe(
      (data:Category)=>{
        // console.log(data);
        this.updateCateForm.patchValue({
          title:data.title,
          description:data.description,
        });

      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!","Error in loading category Data !!","error");
      }
    );

  }


  // submit data
  updateCategory(){
    if(this.updateCateForm.invalid){
      return
    }
    
    this.category = this.updateCateForm.value;
    
    this.cateService.updateCategory(this.category).subscribe(
      (data)=>{
        // console.log(data);
        Swal.fire("Success !!","Successfully Updated Category !!","success").then(
          (ok)=>{
            this.router.navigate(['/admin/categories']);
          }
        );
        
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!","Error in updating Category !!","error");
      }
    );

  }

}
