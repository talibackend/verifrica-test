import { env } from 'process';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../modules/user/user.entity';
import { Follow } from '../modules/follow/follow.entity';
import { Post } from '../modules/post/post.entity';
import { Like } from '../modules/like/like.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage : 'db.sqlite'
      });
      sequelize.addModels([User, Follow, Post, Like]);
      await sequelize.sync({ alter : true });
      return sequelize;
    },
  },
];