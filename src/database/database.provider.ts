import { env } from 'process';
import { Sequelize } from 'sequelize-typescript';

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
    //   sequelize.addModels([Cat]);
      await sequelize.sync({ alter : true });
      return sequelize;
    },
  },
];