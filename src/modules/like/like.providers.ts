import { Like } from './like.entity';

export const likeProviders = [
    {
        provide : 'LIKE_REPOSITORY',
        useValue : Like
    }
];