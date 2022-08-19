import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  //load all the categories
  public getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(`${baseUrl}/category/`);
  }

  // add new Category
  public addCategory(category:Category):Observable<Category>{
    return this.http.post<Category>(`${baseUrl}/category/`,category);
  }

  //delete a category
  public deleteCategory(categoryId:number){
    return this.http.delete(`${baseUrl}/category/${categoryId}`);
  }

  //update category
  public updateCategory(category:Category){
    return this.http.put(`${baseUrl}/category/`,category);
  }

  // get one category by ID 
  public getCategory(CateId:number):Observable<Category>{
    return this.http.get<Category>(`${baseUrl}/category/${CateId}`);
  }

}
