import { Category } from "./category";

export class Quiz {
    quizId!:number;
    title!:string;
    description!:string;
    maxMarks!:string;
    numberOfQuestions!:string;
    active!: boolean;
    category!:Category;

    public Quiz(quizId:number,title:string,description:string,maxMarks:string,number:string,active:boolean,category:Category){
        this.quizId = quizId;
        this.title = title;
        this.description = description;
        this.maxMarks = maxMarks;
        this.numberOfQuestions = this.numberOfQuestions;
        this.active = active;
        this.category = category;
    }

    

}
