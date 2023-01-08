import * as jwt from 'jsonwebtoken';
// import { SignupPayloadType } from '../types/user.types';
import { User } from '../modules/user/user.entity';
import { env } from 'process';

export const generate = (user : User) : string =>{
    if(user.password){
        delete user.password;
    }
    return jwt.sign(user, env.JWT_SECRET);
}

export const validate = (token : string) : { id : number, email : string, password : string, name : string } =>{
    return JSON.parse(jwt.verify(token, env.JWT_SECRET) as string);
}