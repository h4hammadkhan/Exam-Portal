import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../model/question';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private http: HttpClient
  ) { }


  // get all questions of quiz
  public getQuestionOfQuiz(quizId:number):Observable<Question[]>{
    return this.http.get<Question[]>(`${baseUrl}/question/quiz/all/${quizId}`); 
  }
 
  //add question
  public addQuestion(question:Question){
    return this.http.post(`${baseUrl}/question/`,question);
  }

  // delete questions
  public deleteQuestion(questionId:number){
    return this.http.delete(`${baseUrl}/question/${questionId}`);
  }

  // get one question
  public getQuestion(questionId:number):Observable<Question>{
    return this.http.get<Question>(`${baseUrl}/question/${questionId}`);
  } 

  //update question
  public updateQuestion(question:Question){
    return this.http.put(`${baseUrl}/question/`,question);
  }



}
