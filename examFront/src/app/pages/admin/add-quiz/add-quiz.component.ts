import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Category } from 'src/app/model/category';
import { Quiz } from 'src/app/model/quiz';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  
  category:Category[] = [];
  quiz!:Quiz;
  quizForm!:FormGroup;

  constructor(private cateService:CategoryService, private formBuilder: FormBuilder, private quizService:QuizService) { }

  ngOnInit() {
    this.quizForm = this.formBuilder.group({
      title:['',Validators.required],
      description:['',Validators.required],
      maxMarks:['',Validators.required],
      numberOfQuestions:['',Validators.required],
      active:[false],
      category: this.formBuilder.group({
        id:['',Validators.required],
      }),
    })
    this.loadCategory();
    
  }

  loadCategory(){
    this.cateService.getCategories().subscribe(
      (data:Category[])=>{
        this.category = data;
        console.log(data);
        
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!",'error in loading category data form server !!',error);
      }
    )
  }

  get fields(){
    return this.quizForm.controls;
  }

  addQuiz(){
    if(this.quizForm.invalid){
      return
    }
    
    this.quiz = this.quizForm.value;
    // console.log("quizData: ",this.quizForm.value);
    console.log(this.quiz);
    
    //console.log(this.quizForm.get(['category','id'])?.value); // get nested form group values
  
    this.quizService.addQuiz(this.quiz).subscribe(
      (data)=>{
        console.log(data);
        Swal.fire("Success !!",'Quiz added Successfully !!','success');
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!",'Server Error while adding quiz !!','error');        
      }
    )
  }

}
