import { Body, Controller, Post, Req, Res, UsePipes } from "@nestjs/common";
import { PostService } from "src/services/post.service";
import { CreatePostPayloadType } from "src/types/post.types";
import { createPostSchema } from "src/utils/schemas/post.schemas";
import { Validator } from 'src/utils/validator';
import { Request, Response } from 'express';

@Controller('/post')
export class PostController {
    constructor(private postService : PostService){}

    @Post('/')
    @UsePipes(new Validator(createPostSchema))
    async createPost(@Body() body : CreatePostPayloadType, @Req() req : Request, @Res() res : Response) : Promise<Response> {
        let serviceInvocation = await this.postService.createPostService(body, req['user']);
        return res.status(serviceInvocation.status).json({...serviceInvocation});
    }
}