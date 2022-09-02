export class Userlogin {
    userName!:string;
    password!:string;

    constructor (userName:string, password:string){
        this.userName = userName;
        this.password = password;
    }

    public setUserName(userName:string){
        this.userName = userName;
    }
    public setPassword(password:string){
        this.password = password
    }
}
