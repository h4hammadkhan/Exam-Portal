import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../model/quiz';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  public getquizzes():Observable<Quiz[]>{
    return this.http.get<Quiz[]>(`${baseUrl}/quiz/`);
  }

  public addQuiz(quiz:Quiz){
    return this.http.post(`${baseUrl}/quiz/`,quiz);
  }

  public deleteQuiz(quizId:number){
    return this.http.delete(`${baseUrl}/quiz/${quizId}`);
  }

  // get single quiz
  public getQuiz(quizId:number): Observable<Quiz>{
    return this.http.get<Quiz>(`${baseUrl}/quiz/${quizId}`);
  }

  //update quiz
  public updateQuiz(quiz:Quiz){
    return this.http.post(`${baseUrl}/quiz/`,quiz);
  }

  //get quizzes of category
  public getQuizzesOfCategory(categoryId:number){
    return this.http.get(`${baseUrl}/quiz/category/all/${categoryId}`);
  }

  // get active quizzes
  public getActiveQuizzes():Observable<Quiz[]>{
    return this.http.get<Quiz[]>(`${baseUrl}/quiz/active-quiz`);
  }

  // get active quizzes of the category
  public getActiveQuizzesOfCategory(categoryId:number):Observable<Quiz[]>{
    return this.http.get<Quiz[]>(`${baseUrl}/quiz/category/active-quiz/${categoryId}`);
  }


}
