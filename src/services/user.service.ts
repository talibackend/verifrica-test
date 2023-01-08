import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { User } from '../modules/user/user.entity';
import { SignupPayloadType, LoginPayloadType } from '../types/user.types';
import { ApiResponseJsonType } from '../types/api.types';
import { messages } from '../utils/consts';
import { encrypt, decrypt } from '../utils/auth';

@Injectable()
export class UserService {
    constructor(@Inject('USER_REPOSITORY') private UserRepo : typeof User ){}
    
    async signupService(payload : SignupPayloadType) : Promise<ApiResponseJsonType> {
        let { email, name, password } = payload;
        let searchUser = await this.UserRepo.findOne({ where : { email } });

        if(searchUser){
            return { status : HttpStatus.BAD_REQUEST, message : messages.DUPLICATE_EMAIL, error : messages.DUPLICATE_EMAIL };
        }
        try{
            password = await encrypt(password);
            await this.UserRepo.create({ name, email, password });
            return { status : HttpStatus.CREATED, message : messages.SIGNUP_SUCCESSFUL, body : { email, name } };
        }catch(error){
            console.error(error);
            return { status : HttpStatus.INTERNAL_SERVER_ERROR, message : messages.INTERNAL_SERVER_ERROR, error : messages.INTERNAL_SERVER_ERROR };
        }
    }

    async loginService(payload : LoginPayloadType) : Promise<ApiResponseJsonType> {
        const { email, password } = payload;
        return { status : 200, message : "Hello world./.." };
    }
}
