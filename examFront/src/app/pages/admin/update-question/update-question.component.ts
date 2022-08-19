import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Question } from 'src/app/model/question';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  public Editor = ClassicEditor;

  updateQuestionForm!:FormGroup;
  questionId!:number;
  question!:Question;

  constructor(
    private formBuilder:FormBuilder,
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private router : Router,
  ) { }

  ngOnInit() {
    // get value from url
    this.questionId = this.activatedRoute.snapshot.params['questionId'];

    //question form
    this.updateQuestionForm = this.formBuilder.group({
      questionId:['',Validators.required],
      content:['',Validators.required],
      option1:['',Validators.required],
      option2:['',Validators.required],
      option3:['',Validators.required],
      option4:['',Validators.required],
      answer:['',Validators.required],
      quiz: this.formBuilder.group({
        quizId:['',Validators.required],
        title:[''],
      })
    });

    // load questionById data form server
    this.loadQuestionById();
    
  }

  get fields(){
    return this.updateQuestionForm.controls;
  }

  // load question
  loadQuestionById(){
    this.questionService.getQuestion(this.questionId).subscribe(
      (data:Question)=>{
          console.log(data);
          this.updateQuestionForm.patchValue({
            questionId:data.questionId,
            content: data.content,
            option1:data.option1,
            option2:data.option2,
            option3:data.option3,
            option4:data.option4,
            answer:data.answer,
            quiz:{
              quizId:data.quiz.quizId,
              title:data.quiz.title,
            },
          });
          
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!","Error in loading question !!","error");
      }
    );
  }

  // submit data from form and added to the data base
  updateQuestion(){
    if(this.updateQuestionForm.invalid){
      return
    }
    this.question = this.updateQuestionForm.value;
    console.log(this.question); 

    this.questionService.updateQuestion(this.question).subscribe(
      (data)=>{
        Swal.fire("Success !!","Updated question Successfully !!","success").then(
          (ok)=>{

            this.router.navigate([`/admin/view-questions/${this.question.quiz.quizId}/${this.question.quiz.title}`]);
          }
        );
        console.log(this.question.quiz);
        
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!","Error in Updating question !!","error");
      }
    );
        
  }

}
