import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserController } from '../../controllers/user.controller';
import { UserService } from '../../services/user.service';
import { usersProviders } from './user.providers';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
// import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, ...usersProviders],
})

export class UserModule {}

// export class UserModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware).forRoutes(UserController);
//   }
// }
