import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/app/model/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  cateId!:number;
  quizzes!:Quiz[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService:QuizService,
  ) { }

  ngOnInit(): void {
    
    
    this.activatedRoute.params.subscribe(
      (param)=>{
        
        this.cateId = param['cateId'];

        if(this.cateId==0){
          console.log("Load all the quiz");
          this.quizService.getquizzes().subscribe(
            (data:Quiz[])=>{
              this.quizzes = data;
              console.log(this.quizzes);
            },
            (error)=>{
              Swal.fire("Error !!","Error in loading quizzes !!","error");
              console.log(error);
            }
          );
    
        }else if(this.cateId>0){
          console.log("Load specific quiz");
          this.quizService.getQuiz(this.cateId).subscribe(
            (data:any)=>{
              this.quizzes = data;
              console.log(this.quizzes);
            },
            (error)=>{
              Swal.fire("Error !!","Error in loading quiz !!","error");
              console.log(error);
            }
          )
        }
        
      }

    );

    

  }

}
