import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { Question } from 'src/app/model/question';
import { Quiz } from 'src/app/model/quiz';
import { CategoryService } from 'src/app/services/category.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {


  totalCategories:number = 0;
  totalQuizzes:number = 0;
  totalQuestions:number = 0;

  constructor(
    private cateService: CategoryService,
    private quizService: QuizService,
    private quesService: QuestionService,
  ) { }

  ngOnInit(): void {

    this.getNumberOfCate();
    this.getNumberOfQues();
    this.getNumberOfQuiz();

  }

  getNumberOfCate(){
    this.cateService.getCategories().subscribe(
      (data:Category[])=>{ this.totalCategories = Number(data?.length)},
      (error)=>{console.log(error);}
    )
  }
  
  getNumberOfQuiz(){
    this.quizService.getquizzes().subscribe(
      (data:Quiz[])=>{ this.totalQuizzes = Number(data?.length)},
      (error)=>{console.log(error);}
    )
  }

  getNumberOfQues(){
    this.quesService.getAllQuestionsOfEveryQuiz().subscribe(
      (data:Question[])=>{ this.totalQuestions = Number(data?.length)},
      (error)=>{console.log(error);}
    )
  }






}
