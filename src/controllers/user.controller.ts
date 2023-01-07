import { Controller, Post, UsePipes, Body, Response } from "@nestjs/common";
import { Validator } from '../utils/validator';
import { SignupPayloadType } from '../types/user.types';
import { signupSchema } from '../utils/schemas/user.schemas';

@Controller('/user')
export class UserController{

    @Post('/signup')
    @UsePipes(new Validator(signupSchema))
    async signup(@Body() body : SignupPayloadType){
        console.log(body);
        return { hello : "World" };
    }

}