import { Inject, Injectable } from "@nestjs/common";
import { Follow } from '../modules/follow/follow.entity';

@Injectable()
export class FollowService {
    constructor ( @Inject('FOLLOW_RESPOSITORY') private followRepository : Follow ) {}
}