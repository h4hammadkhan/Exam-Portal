import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/model/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes:Quiz[] = [];
  constructor( private quizService:QuizService) { }

  ngOnInit(): void {
    this.loadQuiz();
  }

  deleteQuiz(quizId:number){
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
        this.quizService.deleteQuiz(quizId).subscribe(
          (data)=>{
            // Swal.fire("Success !!",'Category successfully deleted !!','success');
            Swal.fire('Deleted!','Quiz has been deleted.','success')
            this.loadQuiz();
          },
          (error)=>{
            Swal.fire("Error !!",'Error in Deleting quiz !!','error');
            console.log(error);
            
          }
        )
      }
    })
  }

  loadQuiz(){
    this.quizService.getquizzes().subscribe(
      (data:Quiz[])=>{
        this.quizzes = data;
        console.log(data);
        
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!",'Error in Loading data !!',error);
      }
    )
  }

}