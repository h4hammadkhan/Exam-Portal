import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/model/question';
import { Result } from 'src/app/model/result';
import { QuestionService } from 'src/app/services/question.service';
import { LoginService } from 'src/app/services/login.service'
import Swal from 'sweetalert2';
import { concat } from 'rxjs';

@Component({
  selector: 'app-start-test',
  templateUrl: './start-test.component.html',
  styleUrls: ['./start-test.component.css']
})

export class StartTestComponent implements OnInit {

  quizId!:number;
  question!:Question[];
  result!:Result;
  isSubmit:boolean = false;
  timer!:number;
  timerColor:string = 'primary';
  stopInterval:any;



  constructor(
    private locationStrategy: LocationStrategy,
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private loginService: LoginService,
  ) { }

  ngOnInit() {

    this.quizId = this.activatedRoute.snapshot.params['quizId'];
    console.log(this.quizId);
  
    this.preventBackButton();

    this.LoadQuestions();
    
    //prevent to right click
    // document.addEventListener('contextmenu', event => event.preventDefault());


    // setInterval(()=>{

    //   console.log(this.getFormatedTime());
       
    // },1000);
    

  }

  //get userName
  getUserName(){
    return this.loginService.getUser().userName;
  }

  //get user fullname
  getName(){
    let fname= this.loginService.getUser().firstName;
    let lname = this.loginService.getUser().lastName;
    let fullName = fname.concat(' ').concat(lname);
    return fullName.toUpperCase();
  }

  //get user Proile
  getUserProfile(){
    return this.loginService.getUser().profile;
  }


  // load questions
  LoadQuestions() {
    this.questionService.getQuestionOfQuizForTest(this.quizId).subscribe(
      (data:Question[])=>{
        console.log(data);
        this.question = data;

        // calculate time 
        this.timer = this.question?.length * 2 *60;

        // time start
        this.startTimer();
        
        
        
      },
      (error:any)=>{
        console.log(error);
        Swal.fire("Error !!",`${error.error.text}`,"error");

      }
    )
  }

  preventBackButton(){
    history.pushState(null,"null",location.href);
    this.locationStrategy.onPopState(()=>{
      history.pushState(null,"null",location.href);
    });
  }

  singleQuestionMark(){
    let mark = this.question[0].quiz.maxMarks;
    let totalQuestion = this.question.length;
    return Number(mark)/totalQuestion;

  }

  submit(){
    Swal.fire({
      title:'Do you want to Submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      icon: 'question',
    }).then((submit)=>{
      if(submit.isConfirmed){
        clearInterval(this.stopInterval);
        this.QheckQuiz();
        
      }
    })
  }


  startTimer(){
    this.stopInterval = setInterval(()=>{
      
      if(this.timer<=0){
        this.QheckQuiz();
        clearInterval(this.stopInterval);
      }else{
        this.timer--;
      }

      if(this.timer<=90){
        this.timerColor = 'warn';
      }

    }, 1000);  
  }

  getFormatedTime(){
    let mints = Math.floor(this.timer/60);
    let second = this.timer-mints*60;
    return `${mints} min : ${second} sec`;
  }

  // get duration of submit quiz
  durationTime(){    
    let submitionTime = this.timer;
    let totalQuizDuration = this.question?.length * 2 *60;
    let timeTakes = totalQuizDuration - submitionTime;
    let mints = Math.floor(timeTakes/60);
    let second = timeTakes-mints*60;
    return `${mints} min : ${second} sec `;
    
  }

  //get score percentage 
  getScorePer(){
    let obt = this.result?.marksGot;
    let total = Number(this.question[0].quiz.maxMarks);
    let per = (obt*100/total).toFixed(2);
    return `${per}`;
  }

  //get score out of total eg. (55/100)
  getScoreOutOfTotal(){
    return `${this.result?.marksGot}/${this.question[0].quiz.maxMarks}`;
  } 


  //calculate percentage for timer
  percentageTime(){
    return (this.timer/(this.question?.length * 2 *60))*100;
  }

  // submit quiz automatically 
  QheckQuiz(){

    //check questions form serve side 
    this.questionService.checkQuizQues(this.question).subscribe(
      (data:Result)=>{
        console.log(data);
        clearInterval(this.stopInterval);
        // this.result.correctAnswer = data.correctAnswer;
        // this.result.attempted = data.attempted;
        this.result = data;
        this.result.marksGot = parseFloat(data.marksGot.toFixed(2));
        console.log(this.result);
        
      
      },
      (error)=>{
        console.log(error);
        
      }
    )


    this.isSubmit=true;

    // client side checking 
    //     this.question.forEach(q=>{
    //       if(q.givenAnswer == q.answer){

    //         let singleMark = this.singleQuestionMark();
    //         console.log("single Q M: ",singleMark);
            
    //         this.correctAnswer++;
    //         this.marksGot+=singleMark;

    //       }

    //       if(q.givenAnswer.trim()!=''){
    //         this.attempted++;
    //       }

    //     })

    //     console.log("correct answer:",this.correctAnswer);
    //     console.log("Marks got:",this.marksGot);
    //     console.log("Attempted:",this.attempted);
    //     console.log(this.question);
        

  }

  printPage(){
    window.print();
  }

}