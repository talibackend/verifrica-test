import { Module } from "@nestjs/common";
import { FollowService } from '../../services/follow.service';

@Module({
    controllers : [],
    providers : [FollowService]
})

export class FollowModule {}