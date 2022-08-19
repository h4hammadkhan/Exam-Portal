import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/model/question';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})

export class AddQuestionComponent implements OnInit {

  public Editor = ClassicEditor;

  quizId!:number;
  quizTitle!:string;
  questionForm!:FormGroup;
  question!:Question;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private questionService:QuestionService,
  ) { }

  ngOnInit() {

    this.quizId = this.activatedRoute.snapshot.params['quizId'];
    this.quizTitle = this.activatedRoute.snapshot.params['title'];
    
    //question form
    this.questionForm = this.formBuilder.group({
      content:['',Validators.required],
      option1:['',Validators.required],
      option2:['',Validators.required],
      option3:['',Validators.required],
      option4:['',Validators.required],
      answer:['',Validators.required],
      quiz: this.formBuilder.group({
        quizId:[this.quizId,Validators.required],
      })
    });


 
    
  }

  //return form data
  get fields(){
    return this.questionForm.controls;
  }

  //submit
  addQuestion(){
    if(this.questionForm.invalid){
      return
    }
    this.question = this.questionForm.value;
    console.log(this.question);
    
    this.questionService.addQuestion(this.question).subscribe(
      ()=>{
        Swal.fire("Success !!","Successfully added to the quiz !!","success");
      },
      (error)=>{
        Swal.fire("Error !!","Error in adding question !!","error");
        console.log(error);
        
      }
    )
    
  }

 

}
