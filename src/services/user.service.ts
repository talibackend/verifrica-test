import { Injectable, Inject } from '@nestjs/common';
import { User } from '../modules/user/user.entity';
import { SignupPayloadType } from '../types/user.types';
import { ApiResponseJsonType } from '../types/api.types'
import { Response } from 'express';

@Injectable()
export class UserService {
    constructor(@Inject('USER_REPOSITORY') private UserRepo : typeof User ){}
    
    async signupService(payload : SignupPayloadType, res : Response) : Promise<Response> {
        return await res.status(200).json({ hello : "world" });
    }
}
