import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Quiz } from 'src/app/model/quiz';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  category!:Category[];
  quizId=0;
  quiz!:Quiz;
  updateQuizForm!:FormGroup;


  constructor(private activatedRoute: ActivatedRoute, private quizService: QuizService, private formBuilder: FormBuilder, private cateService: CategoryService, private router:Router) { }

  ngOnInit() {
    // Update Quiz Form 
    this.updateQuizForm = this.formBuilder.group({
      quizId:['',Validators.required],
      title:['',Validators.required],
      description:['',Validators.required],
      maxMarks:['',Validators.required],
      numberOfQuestions:['',Validators.required],
      active:[false],
      category: this.formBuilder.group({
        id:['',Validators.required],
      }),
    })
    
    // getting all categories
    this.loadCategories();

    // get quizId from url
    this.quizId = this.activatedRoute.snapshot.params['quizId'];
    // get data quiz data by it's quizId and set/bind the value into the updateQuizFrom
    this.getQuizSetForm();  


  }

  get fields(){
    return this.updateQuizForm.controls;
  }

  getQuizSetForm(){
    this.quizService.getQuiz(this.quizId).subscribe(
      (data:Quiz)=>{
        // set value to the form 
        // setValue({}) : set all the fields values, error when missed one of the field.   
        // patchValue({}) : set specific given fields values
        this.updateQuizForm.patchValue({
          quizId: data.quizId,
          title: data.title,
          description:data.description,
          maxMarks:data.maxMarks,
          numberOfQuestions:data.numberOfQuestions,
          active:data.active,
          category:data.category,
        })

        // console.log(this.quiz);
      
      },
      (error)=>{
        console.log(error);
        
      }
    );
  }
 
  //get category
  loadCategories(){
    this.cateService.getCategories().subscribe(
      (data:Category[])=>{
        this.category = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  //submit
  updateQuiz(){
    if(this.updateQuizForm.invalid){
      return
    }
    this.quiz = this.updateQuizForm.value;
    console.log(this.quiz);

    this.quizService.updateQuiz(this.quiz).subscribe(
      (data)=>{
        Swal.fire('Success !!','Quiz Successfully updated !!','success').then(
          (ok)=>{
            this.router.navigate(['/admin/quizzes']);
          }
        );
      },
      (error)=>{
        Swal.fire('Error !!','Error in updating quiz !!','error');
        console.log(error);
        
      }
    )
     
  }



}
