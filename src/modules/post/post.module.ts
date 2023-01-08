import { usersProviders } from "../user/user.providers";
import { postProviders } from "./post.providers";
import { followProviders } from "../follow/follow.providers";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { PostService } from '../../services/post.service';
import { PostController } from "src/controllers/post.controller";
import { AuthMiddleware } from "src/middlewares/auth.middleware";

@Module({
    imports : [],
    controllers : [PostController],
    providers : [PostService, ...usersProviders, ...postProviders, ...followProviders]
})

export class PostModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(PostController)
    }
}