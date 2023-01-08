import { Module } from '@nestjs/common';
import { UserController } from '../../controllers/user.controller';
import { UserService } from '../../services/user.service';
import { usersProviders } from './user.providers';
// import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, ...usersProviders],
})
export class UserModule {}
