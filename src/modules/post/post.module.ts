import { usersProviders } from "../user/user.providers";
import { postProviders } from "./post.providers";
import { Module } from "@nestjs/common";
import { PostService } from '../../services/post.service';
import { PostController } from "src/controllers/post.controller";

@Module({
    imports : [],
    controllers : [PostController],
    providers : [PostService, ...usersProviders, ...postProviders]
})

export class PostModule {}