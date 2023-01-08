import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { FollowService } from '../../services/follow.service';
import { FollowController } from "../../controllers/follow.controller";
import { followProviders } from './follow.providers';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { usersProviders } from "../user/user.providers";

@Module({
    imports : [],
    controllers : [FollowController],
    providers : [FollowService, ...followProviders, ...usersProviders]
})

export class FollowModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(FollowController);
    }
}