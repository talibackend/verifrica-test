import { User } from './user.entity';

export const catsProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
];