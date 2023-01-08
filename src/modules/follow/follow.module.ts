import { Module } from "@nestjs/common";
import { FollowService } from '../../services/follow.service';
import { FollowController } from "../../controllers/follow.controller";
import { followProviders } from './follow.providers';

@Module({
    imports : [],
    controllers : [FollowController],
    providers : [FollowService, ...followProviders]
})

export class FollowModule {}