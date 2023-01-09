import { Controller, Post, UsePipes, Body, Res } from "@nestjs/common";
import { Validator } from '../utils/validator';
import { SignupPayloadType, LoginPayloadType } from '../types/user.dto';
import { signupSchema, loginSchema } from "../utils/schemas/user.schema";
import { UserService } from '../services/user.service';
import { Response } from "express";

@Controller('/user')
export class UserController{
    constructor(private userService : UserService){}

    @Post('/signup')
    @UsePipes(new Validator(signupSchema))
    async signup(@Body() body : SignupPayloadType, @Res() res : Response) : Promise<Response> {
        let serviceInvocation = await this.userService.signupService(body);
        return res.status(serviceInvocation.status).json({...serviceInvocation});
    }
    
    @Post('login')
    @UsePipes(new Validator(loginSchema))
    async login(@Body() body : LoginPayloadType, @Res() res : Response) : Promise<Response> {
        let serviceInvocation = await this.userService.loginService(body);
        return res.status(serviceInvocation.status).json({...serviceInvocation});
    }

}