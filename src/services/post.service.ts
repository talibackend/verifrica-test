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
import { Op, Order } from 'sequelize';
import { PostedDirection } from 'src/types/post.types';

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
        searchPost['user'] = (await this.UserRepo.findOne({attributes : ['name', 'email', 'id'], where : { id : searchPost.user_id }})).dataValues;

        if(searchPost.user_id !== user.id){
            await this.PostRepo.update({ views : searchPost.views + 1 }, { where : { id : searchPost.id } });
        }

        return { status : HttpStatus.OK, message : messages.POST_FETCHED, body : { post : searchPost } };
    }

    async getPostsService(payload : GetPostsPayloadType, user : User) : Promise<ApiResponseJsonType> {
        let { views, posted, posted_direction, offset, limit } = payload;

        if(!limit){
            limit = 10;
        }

        if(!offset){
            offset = 0;
        }

        if(!posted_direction){
            posted_direction = PostedDirection.gte;
        }

        let peopleFollowing : Array<Follow> | Array<number> = await this.FollowRepo.findAll({ where : { follower : user.id } });
        peopleFollowing = peopleFollowing.map((p)=>{ return p.followed });

        let where = { user_id : { [Op.in] : peopleFollowing } };
        let order : Order = [['id', 'desc']];

        if(views){
            order.push(['views', 'desc']);
        }

        if(posted){
            where['createdAt'] = {[Op.gte] : posted}; 
            if(posted_direction !== 'gte'){
                where['createdAt'] = {[Op.lte] : posted}; 
            }
        }

        let posts : Array<Post> = await this.PostRepo.findAll({ where, order, limit, offset });

        for(let i = 0; i < posts.length; i++){
            let post = posts[i];
            posts[i]['user'] = (await this.UserRepo.findOne({ attributes : ['name', 'email', 'id'], where : { id : post.user_id } })).dataValues
        }

        return { status : HttpStatus.OK, message : "Fetched", body : { posts } };
    }
}