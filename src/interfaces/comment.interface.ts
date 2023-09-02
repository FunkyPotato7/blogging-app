import { IProfile } from '@/interfaces/feed.interface';

export interface IComment {
    id: number,
    created_at: string,
    comment: string,
    user_id: string,
    feed_id: number,
    profile: IProfile,
}