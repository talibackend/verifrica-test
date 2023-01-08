import { env } from 'process';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../modules/user/user.entity';
import { Follow } from '../modules/follow/follow.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: env.PG_HOST,
        port: parseInt(env.PG_PORT),
        username: env.PG_USERNAME,
        password: env.PG_PASSWORD,
        database: env.PG_DB,
      });
      sequelize.addModels([User, Follow]);
      await sequelize.sync({ alter : true });
      return sequelize;
    },
  },
];