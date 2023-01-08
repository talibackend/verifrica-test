import { usersProviders } from "../user/user.providers";
import { postProviders } from "./post.providers";
import { Post } from './post.entity';
import { Module } from "@nestjs/common";
import { PostService } from '../../services/post.service';

@Module({
    imports : [],
    controllers : [],
    providers : [PostService, ...usersProviders, ...postProviders]
})

export class PostModule {}