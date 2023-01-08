import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserController } from '../../controllers/user.controller';
import { UserService } from '../../services/user.service';
import { usersProviders } from './user.providers';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, ...usersProviders],
})

export class UserModule {}
