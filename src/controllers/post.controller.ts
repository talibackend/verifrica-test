import { Controller, Post } from "@nestjs/common";
import { PostService } from "src/services/post.service";

@Controller('/post')
export class PostController {
    constructor(private postService : PostService){}

    @Post('/')
    async createPost(){
        return { hello : "world" };
    }
}