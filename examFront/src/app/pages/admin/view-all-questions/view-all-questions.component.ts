import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/model/question';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-all-questions',
  templateUrl: './view-all-questions.component.html',
  styleUrls: ['./view-all-questions.component.css']
})
export class ViewAllQuestionsComponent implements OnInit {

  questions!:Question[];

  constructor(
    private quesService: QuestionService,

  ) { }

  ngOnInit() {
    this.quesService.getAllQuestionsOfEveryQuiz().subscribe(
      (data:Question[])=>{
        this.questions = data;
      },
      (error)=>{
        Swal.fire("Error!!","Error in Loading all questions!!","error");
        console.log(error);
        
      }
    )
  }

}
