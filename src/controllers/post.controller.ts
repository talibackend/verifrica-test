import { Body, Controller, Patch, Post, Req, Res, UsePipes, Delete, Get, Param, Query } from "@nestjs/common";
import { PostService } from "src/services/post.service";
import { 
    CreatePostPayloadType, 
    EditPostPayloadType, 
    DeletePostPayloadType, 
    GetPostPayloadType,
    GetPostsPayloadType
} from "src/types/post.dto";
import { 
    createPostSchema, 
    editPostSchema, 
    deletePostSchema, 
    getPostSchema,
    getPostsSchema
} from "src/utils/schemas/post.schemas";
import { Validator } from 'src/utils/validator';
import { Request, Response } from 'express';
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Post")
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
    async deletePost(@Body() body : DeletePostPayloadType, @Req() req : Request, @Res() res : Response) : Promise<Response> {
        let serviceInvocation = await this.postService.deletePostService(body, req['user']);
        return res.status(serviceInvocation.status).json({...serviceInvocation});
    }

    @Get('/:slug')
    @UsePipes(new Validator(getPostSchema))
    async getPost(@Param() params : GetPostPayloadType, @Req() req : Request, @Res() res : Response) : Promise<Response> {
        let serviceInvocation = await this.postService.getPostService(params, req['user']);
        return res.status(serviceInvocation.status).json({...serviceInvocation});
    }

    @Get('/')
    @UsePipes(new Validator(getPostsSchema))
    async getPosts(@Query() query : GetPostsPayloadType, @Req() req : Request, @Res() res : Response) : Promise<Response> {
        let serviceInvocation = await this.postService.getPostsService(query, req['user']);
        return res.status(serviceInvocation.status).json({...serviceInvocation});
    }
}