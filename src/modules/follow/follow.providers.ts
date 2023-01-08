import { Follow } from './follow.entity';

export const followProviders = [
    {
        provide : 'FOLLOW_REPOSITORY',
        useValue : Follow
    }
];