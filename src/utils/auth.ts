import * as jwt from 'jsonwebtoken';
import { User } from '../modules/user/user.entity';
import { env } from 'process';
import { hash, compare } from 'bcrypt';

export const generate = (user : User) : string =>{
    console.log(user);
    console.log(env);
    if(user.password){
        delete user.password;
    }
    return jwt.sign(user, env.JWT_SECRET);
}

export const validate = (token : string) : { id : number, email : string, password : string, name : string } =>{
    return JSON.parse(jwt.verify(token, env.JWT_SECRET) as string);
}

export const encrypt = async (string : string) : Promise<string> =>{
    return await hash(string, 10);
}

export const decrypt = async (string : string, hash : string) : Promise<boolean> =>{
    return await compare(string, hash);
}