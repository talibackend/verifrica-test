import { Body, Controller, Patch, Post, Req, Res, UsePipes, Delete } from "@nestjs/common";
import { PostService } from "src/services/post.service";
import { CreatePostPayloadType, EditPostPayloadType, DeletePayloadType } from "src/types/post.types";
import { createPostSchema, editPostSchema, deletePostSchema } from "src/utils/schemas/post.schemas";
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

    @Patch('/')
    @UsePipes(new Validator(editPostSchema))
    async editPost(@Body() body : EditPostPayloadType, @Req() req : Request, @Res() res : Response) : Promise<Response> {
        let serviceInvocation = await this.postService.editPostService(body, req['user']);
        return res.status(serviceInvocation.status).json({...serviceInvocation});
    }

    @Delete('/')
    @UsePipes(new Validator(deletePostSchema))
    async deletePost(@Body() body : DeletePayloadType, @Req() req : Request, @Res() res : Response) : Promise<Response> {
        let serviceInvocation = await this.postService.deletePostService(body, req['user']);
        return res.status(serviceInvocation.status).json({...serviceInvocation});
    }
}