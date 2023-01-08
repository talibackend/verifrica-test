import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Post } from '../modules/post/post.entity';
import { User } from '../modules/user/user.entity';
import { 
    CreatePostPayloadType, 
    EditPostPayloadType, 
    DeletePostPayloadType, 
    GetPostPayloadType, 
    GetPostsPayloadType 
} from 'src/types/post.types';
import { ApiResponseJsonType } from 'src/types/api.types';
import { messages } from 'src/utils/consts';
import { generateSlug } from 'src/utils/general';
import { Follow } from 'src/modules/follow/follow.entity';
import { Op } from 'sequelize';

@Injectable()
export class PostService{
    constructor(
        @Inject('POST_REPOSITORY') private PostRepo : typeof Post, 
        @Inject('USER_REPOSITORY') private UserRepo : typeof User,
        @Inject('FOLLOW_REPOSITORY') private FollowRepo : typeof Follow
    ){}

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

    async deletePostService(payload : DeletePostPayloadType, user : User) : Promise<ApiResponseJsonType> {
        const { id } = payload;

        let searchPost = await this.PostRepo.findOne({ where : { id } });

        if(!searchPost){
            return { status : HttpStatus.UNAUTHORIZED, message : messages.UNAUTHORIZED, error : messages.UNAUTHORIZED };
        }

        if(searchPost.user_id != user.id){
            return { status : HttpStatus.UNAUTHORIZED, message : messages.UNAUTHORIZED, error : messages.UNAUTHORIZED };
        }

        await this.PostRepo.destroy({ where : { id } });

        return { status : HttpStatus.OK, message : messages.POST_DELETED }
    }

    async getPostService(payload : GetPostPayloadType, user : User) : Promise<ApiResponseJsonType> {
        const { slug } = payload;

        let searchPost = await this.PostRepo.findOne({ where : { slug } });

        if(!searchPost){
            return { status : HttpStatus.NOT_FOUND, message : messages.NOT_FOUND, error : messages.NOT_FOUND };
        }

        searchPost = searchPost.dataValues;
        searchPost['user'] = (await this.UserRepo.findOne({attributes : ['name', 'email'], where : { id : searchPost.user_id }})).dataValues;

        if(searchPost.user_id !== user.id){
            await this.PostRepo.update({ views : searchPost.views + 1 }, { where : { id : searchPost.id } });
        }

        return { status : HttpStatus.OK, message : messages.POST_FETCHED, body : { post : searchPost } };
    }

    async getPostsService(payload : GetPostsPayloadType, user : User) : Promise<ApiResponseJsonType> {
        const { views, posted, posted_direction, offset, limit } = payload;

        let peopleFollowing : Array<Follow> | Array<number> = await this.FollowRepo.findAll({ where : { follower : user.id } });
        peopleFollowing = peopleFollowing.map((p)=>{ return p.followed });

        let options = { where : { user_id : { [Op.in] : peopleFollowing } }, order : [ ['id', 'desc'] ], limit, offset };

        if(views){
            options.order.push(['views', 'desc']);
        }
        if(posted){
            options.where['createdAt'] = {[Op.gte] : posted}; 
            if(posted_direction !== 'gte'){
                options.where['createdAt'] = {[Op.lte] : posted}; 
            }
        }

        console.log(options);

        let posts : Array<Post> = await this.PostRepo.findAll();

        return { status : HttpStatus.OK, message : "Fetched", body : { posts } };
    }
}