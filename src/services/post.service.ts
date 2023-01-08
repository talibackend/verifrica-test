import { Inject, Injectable } from '@nestjs/common';
import { Post } from '../modules/post/post.entity';
import { User } from '../modules/user/user.entity';
import { CreatePostPayloadType } from 'src/types/post.types';
import { ApiResponseJsonType } from 'src/types/api.types';

@Injectable()
export class PostService{
    constructor(@Inject('POST_REPOSITORY') private PostRepo : typeof Post, @Inject('USER_REPOSITORY') private UserRepo : typeof User){}

    async createPostService(payload : CreatePostPayloadType, user : User) : Promise<ApiResponseJsonType> {
        console.log(payload);
        console.log(user);
        return { status : 200, message : "Hello world..." };
    }
}