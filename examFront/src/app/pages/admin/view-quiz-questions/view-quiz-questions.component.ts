import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/model/question';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  quizId!:number;
  quizTitle!:string;
  questions!:Question[];
  length= false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,

  ) { }

  ngOnInit() {
    this.quizId = this.activatedRoute.snapshot.params['quizId'];
    this.quizTitle = this.activatedRoute.snapshot.params['title'];

    
    //loading question 
    this.loadQuestions();
  

  }

  //loading questions
  loadQuestions(){
    this.questionService.getQuestionOfQuiz(this.quizId).subscribe(
      (data:Question[])=>{
        console.log(data);
        this.questions = data;
        // console.log(this.questions.length);
        if(this.questions.length){
          this.length = true;
        }
      },
      (error)=>{
        console.log(error);
        
      }
    );
  }

   //delete questions
   deleteQuestion(questionId:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result)=>{
      if(result.isConfirmed){
        this.questionService.deleteQuestion(questionId).subscribe(
          (data)=>{
            Swal.fire("Success !!","Deleted Successfully !!","success");
            this.loadQuestions();

          },
          (error)=>{
            Swal.fire("Error !!","Error in deleting question !!","error");
            console.log(error);
          }
        )
      }
    });


  }

}
