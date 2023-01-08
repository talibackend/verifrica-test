import * as jwt from 'jsonwebtoken';
import { User } from '../modules/user/user.entity';
import { env } from 'process';
import { hash, compare } from 'bcrypt';

export const generate = (user : User) : string =>{
    if(user.password){
        delete user.password;
    }
    return jwt.sign(user, env.JWT_SECRET);
}

export const validate = (token : string) : any =>{
    let verified = jwt.verify(token, env.JWT_SECRET);
    return verified;
}

export const encrypt = async (string : string) : Promise<string> =>{
    return await hash(string, 10);
}

export const decrypt = async (string : string, hash : string) : Promise<boolean> =>{
    return await compare(string, hash);
}