import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthMiddleware } from "src/middlewares/auth.middleware";
import { LikeController } from "src/controllers/like.controller";
import { LikeService } from "src/services/like.service";
import { likeProviders } from "./like.providers";
import { postProviders } from "../post/post.providers";

@Module({
    providers : [LikeService, ...likeProviders, ...postProviders],
    controllers : [LikeController]
})

export class LikeModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(LikeController)
    }
}