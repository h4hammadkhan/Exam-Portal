export class Category {
    
    id!:number;
    title!:string;
    description!:string;

    public setId(id:number){
        this.id = id;
    }

    public getId(){
        return this.id;
    }
}
