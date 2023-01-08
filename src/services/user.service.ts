import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { User } from '../modules/user/user.entity';
import { SignupPayloadType } from '../types/user.types';
import { ApiResponseJsonType } from '../types/api.types';
import { messages } from '../utils/consts';

@Injectable()
export class UserService {
    constructor(@Inject('USER_REPOSITORY') private UserRepo : typeof User ){}
    
    async signupService(payload : SignupPayloadType) : Promise<ApiResponseJsonType> {
        const { email, name, password } = payload;
        let searchUser = await this.UserRepo.findOne({ where : { email } });

        if(searchUser){
            return { status : HttpStatus.BAD_REQUEST, message : messages.DUPLICATE_EMAIL, error : messages.DUPLICATE_EMAIL };
        }
        try{
            let user = await this.UserRepo.create({ name, email, password });
            return { status : HttpStatus.CREATED, message : messages.SIGNUP_SUCCESSFUL, body : { email, name } };
        }catch(error){
            console.error(error);
            return { status : HttpStatus.INTERNAL_SERVER_ERROR, message : messages.INTERNAL_SERVER_ERROR, error : messages.INTERNAL_SERVER_ERROR };
        }

    }
}
