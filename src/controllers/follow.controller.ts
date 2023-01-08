import { Body, Controller, Post, Req, Res, UsePipes } from '@nestjs/common';
import { FollowService } from '../services/follow.service';
import { Response, Request } from 'express';
import { Validator } from '../utils/validator';
import { followSchema } from '../utils/schemas/follow.schemas';
import { FollowPayloadType } from '../types/follow.types';

@Controller('/follow')
export class FollowController{
    constructor (private followService : FollowService) {}

    @Post('/')
    @UsePipes(new Validator(followSchema))
    async follow(@Body() body : FollowPayloadType, @Req() req : Request){
        console.log(req[`user`]);
        console.log(body);
        return { hello : "world..." };
    }
}