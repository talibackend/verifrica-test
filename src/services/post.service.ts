import { Inject, Injectable } from '@nestjs/common';
import { Post } from '../modules/post/post.entity';
import { User } from '../modules/user/user.entity';

@Injectable()
export class PostService{
    constructor(@Inject('POST_REPOSITORY') private PostRepo : typeof Post, @Inject('USER_REPOSITORY') private UserRepo : typeof User){}
}