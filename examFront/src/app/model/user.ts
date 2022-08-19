export class User {

    id!: number;
    userName!: string;
    password!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    phone!: string;
    enabled!: boolean;
    profile!: string;
    authorities!:[{authority:string}];
}
