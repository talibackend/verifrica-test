import { Inject, Injectable, HttpStatus } from "@nestjs/common";
import { Follow } from '../modules/follow/follow.entity';
import { User } from '../modules/user/user.entity';
import { FollowPayloadType } from '../types/follow.types';
import { ApiResponseJsonType } from '../types/api.types';
import { messages } from "src/utils/consts";

@Injectable()
export class FollowService {
    constructor ( @Inject('FOLLOW_REPOSITORY') private FollowRepo : typeof Follow, @Inject('USER_REPOSITORY') private UserRepo : typeof User ) {}

    async followService(payload : FollowPayloadType, user : User) : Promise<ApiResponseJsonType> {
        const { user_id } = payload;
        let searchUser = await this.UserRepo.findOne({ where : { id : user_id } });

        if(!searchUser || user_id === user.id){
            return { status : HttpStatus.BAD_REQUEST, message : messages.INVALID_USER, error : messages.INVALID_USER };
        }

        let searchFollow = await this.FollowRepo.findOne({ where : { follower : user.id, followed : user_id } });

        if(searchFollow){
            return { status : HttpStatus.BAD_REQUEST, message : messages.ALREADY_FOLLOWING, error : messages.ALREADY_FOLLOWING };
        }

        let follow = await this.FollowRepo.create({ follower : user.id, followed : user_id });

        return { status : HttpStatus.CREATED, message : messages.USER_FOLLOWED, body : { follow } };
    }

    async unfollowService(payload : FollowPayloadType, user : User) : Promise<ApiResponseJsonType> {
        const { user_id } = payload;
        let searchUser = await this.UserRepo.findOne({ where : { id : user_id } });

        if(!searchUser || user_id === user.id){
            return { status : HttpStatus.BAD_REQUEST, message : messages.INVALID_USER, error : messages.INVALID_USER };
        }

        let searchFollow = await this.FollowRepo.findOne({ where : { follower : user.id, followed : user_id } });

        if(!searchFollow){
            return { status : HttpStatus.BAD_REQUEST, message : messages.NOT_FOLLOWING, error : messages.NOT_FOLLOWING };
        }

        await this.FollowRepo.destroy({ where : { follower : user.id, followed : user_id }});

        return { status : HttpStatus.CREATED, message : messages.USER_UNFOLLOWED };
    }
}