import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { User } from '../modules/user/user.entity';
import { SignupPayloadType, LoginPayloadType } from '../types/user.dto';
import { ApiResponseJsonType } from '../types/api.dto';
import { messages } from '../utils/consts';
import { encrypt, decrypt, generate } from '../utils/auth';

@Injectable()
export class UserService {
    constructor(@Inject('USER_REPOSITORY') private UserRepo: typeof User) { }

    async signupService(payload: SignupPayloadType): Promise<ApiResponseJsonType> {
        let { email, name, password } = payload;
        let searchUser = await this.UserRepo.findOne({ where: { email } });

        if (searchUser) {
            return { status: HttpStatus.BAD_REQUEST, message: messages.DUPLICATE_EMAIL, error: messages.DUPLICATE_EMAIL };
        }
        try {
            password = await encrypt(password);
            await this.UserRepo.create({ name, email, password });
            return { status: HttpStatus.CREATED, message: messages.SIGNUP_SUCCESSFUL, body: { email, name } };
        } catch (error) {
            console.error(error);
            return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: messages.INTERNAL_SERVER_ERROR, error: messages.INTERNAL_SERVER_ERROR };
        }
    }

    async loginService(payload: LoginPayloadType): Promise<ApiResponseJsonType> {
        const { email, password } = payload;
        let searchUser = await this.UserRepo.findOne({ where: { email } });

        if (!searchUser) {
            return { status: HttpStatus.UNAUTHORIZED, message: messages.UNAUTHORIZED, error: messages.UNAUTHORIZED };
        }

        if (!(await decrypt(password, searchUser.password))) {
            return { status: HttpStatus.UNAUTHORIZED, message: messages.UNAUTHORIZED, error: messages.UNAUTHORIZED };
        }

        if(!(await decrypt(password, searchUser.password))){
            return { status: HttpStatus.UNAUTHORIZED, message: messages.UNAUTHORIZED, error: messages.UNAUTHORIZED };
        }

        let token = generate(searchUser.dataValues);

        return {
            status: HttpStatus.OK, message: messages.LOGIN_SUCCESSFUL, body:
            {
                name: searchUser.name, email, id : searchUser.id, auth: {
                    type : "bearer",
                    token : token
                }
            }
        }

    }
}
