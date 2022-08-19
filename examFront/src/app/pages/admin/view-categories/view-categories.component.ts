import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories!: Category[];

  constructor(private cateServie:CategoryService) { }

  ngOnInit(): void {
    this.getData();
  }

  deleteCategory(id:number){
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cateServie.deleteCategory(id).subscribe(
          (data)=>{
            // Swal.fire("Success !!",'Category successfully deleted !!','success');
            Swal.fire('Deleted!','Category has been deleted.','success')
            this.getData();
          },
          (error)=>{
            Swal.fire("Error !!",'Server Error !!','error');
            console.log(error);
            
          }
        )
      }
    })
    
  }


  edit(c:Category){
    console.log(c);
    
  }

  getData(){ 
    this.cateServie.getCategories().subscribe(
      (data:Category[])=>{
        this.categories=data;
        // console.log(data);
        console.log(this.categories);
      
      },
    (error)=>{
      console.log(error);
      Swal.fire('Error !!','Error in loading data','error'); 
      
    })
  }


}
