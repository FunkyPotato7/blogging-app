'use client';

import { FC, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import format from 'date-fns/format';

import css from './Feed.module.css';
import { IFeed, IProfile } from '@/interfaces/feed.interface';
import CommentsPopup from '@/components/CommentsPopup/CommentsPopup';
import CommentForm from '@/components/CommentForm/CommentForm';
import useCommentsById from '@/hooks/useCommentsById';

interface IProp {
    feed: IFeed | any,
    user: IProfile,
    children?: ReactNode,
}

const Feed:FC<IProp> = ({ feed, user }) => {
    const { title, body, profile } = feed;
    const router = useRouter();
    const { data: comments} = useCommentsById(feed.id);

    return (
        <div className={css.feedWrapper}>
            <div className={css.profile}>
                <div className={css.avatar} onClick={() => router.push(`/profile/${profile.id}`)}>
                    {profile?.username ? profile.username.slice(0, 1) : 'U'}
                </div>
                <div className={css.usernameWrapper}>
                    <div>
                        <p><b>{!!profile?.username ? profile.username : 'User'}</b></p>
                        <p>{profile?.email}</p>
                    </div>
                    <p>{format(new Date(feed.created_at), 'dd.MM.yyyy HH:mm')}</p>
                </div>
            </div>
            <h1>{title}</h1>
            <p className={css.text}>{body}</p>
            <div className={css.commentComponent}>
                {user?.role === 'Commentator' && <CommentForm user_id={user.id} feed_id={feed.id}/>}
                <CommentsPopup comments={comments}/>
            </div>
        </div>
    );
};

export default Feed;