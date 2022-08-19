import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories!:Category[];

  constructor(
    private cateService:CategoryService,
    private snack:MatSnackBar,
  ) { }

  ngOnInit(): void {

    this.cateService.getCategories().subscribe(
      (data:Category[])=>{
        this.categories = data;
        console.log(data);
        
      },
      (error)=>{
        console.log(error);
        this.snack.open("Error in Loading categories form server !!",'',{
          duration: 3000,
        });        
      }
    );

  }

}
