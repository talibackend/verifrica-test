import { Body, Controller, Post, Res } from '@nestjs/common';
import { FollowService } from '../services/follow.service';
import { Response } from 'express';

@Controller('/follow')
export class FollowController{
    constructor (private followService : FollowService) {}

    @Post('/')
    async follow(){
        return { hello : "world..." };
    }
}