import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/app/model/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  quizId!:number;
  quiz!:Quiz;



  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.quizId = this.activatedRoute.snapshot.params['quizId'];
    // alert(this.quizId);
    this.quizService.getQuiz(this.quizId).subscribe(
      (data:Quiz)=>{
        // console.warn(data);
        this.quiz = data;
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!","Error in loading quiz data !!","error");

      }
    )
  }

  maxTime(){
    const t=this.quiz.numberOfQuestions;
    let time =Number(t)*2;
    return time; 
  }
  
  perQuestionMarks(){
    const maxMarks = this.quiz.maxMarks;
    const numberOfQuestions = this.quiz.numberOfQuestions;
    return Number(maxMarks)/Number(numberOfQuestions);
  }

  // start test
  startTest(){
    // ['/start-test/'+quiz.quizId]
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to start the quiz!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Start'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/start-test/'+this.quiz.quizId]);
      }
    })
  }

}
