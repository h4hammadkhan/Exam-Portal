import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../model/question';
import { Result } from '../model/result';
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

  // get number of question of any quiz
  public getQuestionOfQuizForTest(quizId:number):Observable<Question[]>{
    return this.http.get<Question[]>(`${baseUrl}/question/quiz/${quizId}`);
  }

  // get all the questions of every quiz
  public getAllQuestionsOfEveryQuiz():Observable<Question[]>{
    return this.http.get<Question[]>(`${baseUrl}/question/`);
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


  //check quiz's questions
  public checkQuizQues(questions:Question[]):Observable<Result>{
    return this.http.post<Result>(`${baseUrl}/question/check-quiz/`,questions);
  }



}
