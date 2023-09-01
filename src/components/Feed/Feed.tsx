import { FC, ReactNode } from 'react';

import css from './Feed.module.css';
import { IFeed } from '@/interfaces/feed.interface';

interface IProp {
    feed: IFeed | any,
    children?: ReactNode,
}

const Feed:FC<IProp> = ({ feed }) => {
    const { title, body, profile } = feed;

    return (
        <div className={css.feedWrapper}>
            <div className={css.profile}>
                <div className={css.avatar}>{profile.username ? 'F' : 'U'}</div>
                <div className={css.usernameWrapper}>
                    <p><b>{!!profile.username ? profile.username : 'User'}</b></p>
                    <p>{profile.email}</p>
                </div>
            </div>
            <h1>{title}</h1>
            <p className={css.text}>{body}</p>
        </div>
    );
};

export default Feed;