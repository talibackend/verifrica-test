import { Controller, Post, UsePipes, Body, Req, Res } from "@nestjs/common";
import { LikeUnlikePayloadType } from "src/types/like.dto";
import { likeUnlikeSchema } from "src/utils/schemas/like.schemas";
import { Validator } from "src/utils/validator";
import { Request, Response } from 'express';
import { LikeService } from "src/services/like.service";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("Like")
@ApiBearerAuth()
@Controller('/like')
export class LikeController{
    constructor(private likeService : LikeService){}

    @Post('/')
    @UsePipes(new Validator(likeUnlikeSchema))
    async likeUnlike(@Body() body : LikeUnlikePayloadType, @Req() req : Request, @Res() res : Response) : Promise<Response> {
        let serviceInvocation = await this.likeService.likeUnlikeService(body, req['user']);
        return res.status(serviceInvocation.status).json({...serviceInvocation})
    }
}