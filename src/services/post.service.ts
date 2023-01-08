import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Post } from '../modules/post/post.entity';
import { User } from '../modules/user/user.entity';
import { CreatePostPayloadType, EditPostPayloadType } from 'src/types/post.types';
import { ApiResponseJsonType } from 'src/types/api.types';
import { messages } from 'src/utils/consts';
import { generateSlug } from 'src/utils/general';

@Injectable()
export class PostService{
    constructor(@Inject('POST_REPOSITORY') private PostRepo : typeof Post, @Inject('USER_REPOSITORY') private UserRepo : typeof User){}

    async createPostService(payload : CreatePostPayloadType, user : User) : Promise<ApiResponseJsonType> {
        const { title, content } = payload;
        let searchPost = await this.PostRepo.findOne({ where : { title, user_id : user.id } });
        if(searchPost){
            return { status : HttpStatus.BAD_REQUEST, message : messages.DUPLICATE_POST, error : messages.DUPLICATE_POST };
        }
        let slug = generateSlug(title);
        
        let post = await this.PostRepo.create({ title, content, slug, user_id : user.id });

        return { status : HttpStatus.CREATED, message : messages.POST_CREATED, body : { post } };
    }

    async editPostService(payload : EditPostPayloadType, user : User) : Promise<ApiResponseJsonType> {
        const { id, title, content } = payload;

        let searchPost = await this.PostRepo.findOne({ where : { id } });

        if(!searchPost){
            return { status : HttpStatus.UNAUTHORIZED, message : messages.UNAUTHORIZED, error : messages.UNAUTHORIZED };
        }

        if(searchPost.user_id != user.id){
            return { status : HttpStatus.UNAUTHORIZED, message : messages.UNAUTHORIZED, error : messages.UNAUTHORIZED };
        }

        if(title){
            searchPost.title = title;
        }

        if(content){
            searchPost.content = content;
        }

        await searchPost.save();

        return { status : HttpStatus.OK, message : messages.POST_EDITED, body : { post : searchPost } };
    }
}