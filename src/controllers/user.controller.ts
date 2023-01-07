import { Controller, Post, UsePipes, Body, Response, Res } from "@nestjs/common";
import { Validator } from '../utils/validator';
import { SignupPayloadType } from '../types/user.types';
// import { signupSchema } from '../utils/schemas/user.schemas';
import joi from 'joi';

@Controller('/user')
export class UserController{

    @Post('/signup')
    @UsePipes(new Validator(joi.object({
        name : joi.string().required(),
        email : joi.string().email().required(),
        password : joi.string().min(8)
    })))
    async signup(@Body() body : SignupPayloadType){
        return { hello : "world" };
    }

}