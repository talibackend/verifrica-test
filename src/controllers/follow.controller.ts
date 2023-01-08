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
    async follow(@Body() body : FollowPayloadType, @Req() req : Request, @Res() res : Response) : Promise<Response> {
        let serviceInvocation = await this.followService.follow(body, req['user']);
        return res.status(serviceInvocation.status).json({...serviceInvocation});
    }
}