import { Controller, Post, UsePipes, Body, Res } from "@nestjs/common";
import { Validator } from '../utils/validator';
import { SignupPayloadType } from '../types/user.types';
import { signupSchema } from "../utils/schemas/user.schemas";
import { UserService } from '../services/user.service';
import { Response } from "express";

@Controller('/user')
export class UserController{
    constructor(private userService : UserService){}
    @Post('/signup')
    @UsePipes(new Validator(signupSchema))
    async signup(@Body() body : SignupPayloadType, @Res() res : Response) : Promise<Response> {
        return await this.userService.signupService(body, res);
    }

}