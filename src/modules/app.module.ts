import { Module } from '@nestjs/common';
// import { AppController } from '../controllers/app.controller';
// import { AppService } from '../services/app.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from './user/user.module';
import { FollowModule } from './follow/follow.module';

@Module({
  imports: [DatabaseModule, UserModule, FollowModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
