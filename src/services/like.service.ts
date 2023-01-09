import { Inject, Injectable, HttpStatus } from "@nestjs/common";
import { Like } from "src/modules/like/like.entity";
import { Post } from "src/modules/post/post.entity";
import { User } from "src/modules/user/user.entity";
import { ApiResponseJsonType } from "src/types/api.dto";
import { LikeUnlikePayloadType } from "src/types/like.dto";
import { messages } from "src/utils/consts";


@Injectable()
export class LikeService {
    constructor(
        @Inject('LIKE_REPOSITORY') private LikeRepo : typeof Like,
        @Inject('POST_REPOSITORY') private PostRepo : typeof Post
    ){}

    async likeUnlikeService (payload : LikeUnlikePayloadType, user : User) : Promise<ApiResponseJsonType> {
        let { post_id } = payload;
        let searchPost = await this.PostRepo.findOne({ where : { id : post_id } });

        if(!searchPost){
            return { status : HttpStatus.NOT_FOUND, message : messages.NOT_FOUND, error : messages.NOT_FOUND };
        }

        let searchLike = await this.LikeRepo.findOne({ where : { post_id, user_id : user.id } });

        if(searchLike){
            await this.LikeRepo.destroy({ where : { post_id, user_id : user.id }});
            return { status : HttpStatus.OK, message : messages.POST_UNLIKED };
        }

        let like = await this.LikeRepo.create({ post_id, user_id : user.id });
        return { status : HttpStatus.CREATED, message : messages.POST_LIKED, body : { like } };
    }
}