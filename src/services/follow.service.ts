import { Inject, Injectable } from "@nestjs/common";
import { Follow } from '../modules/follow/follow.entity';

@Injectable()
export class FollowService {
    constructor ( @Inject('FOLLOW_REPOSITORY') private FollowRepo : typeof Follow ) {}
}