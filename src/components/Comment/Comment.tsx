import { FC } from 'react';
import { useRouter } from "next/navigation";
import format from 'date-fns/format';

import css from './Comment.module.css';
import { IComment } from '@/interfaces/comment.interface';

interface IProps {
    comment: IComment,
}

const Comment:FC<IProps> = ({ comment: { comment, profile, id, created_at } }) => {
    const router = useRouter();

    return (
        <div className={css.main}>
            <div className={css.profile}>
                <div className={css.avatar} onClick={() => router.push(`/profile/${profile.id}`)}>
                    {profile.username ? profile.username.slice(0, 1) : 'U'}
                </div>
                <div className={css.usernameWrapper}>
                    <p><b>{!!profile.username ? profile.username : 'User'}</b></p>
                    <p>{profile.email}</p>
                </div>
            </div>
            <p>{comment}</p>
            <p>{format(new Date(created_at), 'dd.MM.yyyy HH:mm')}</p>
        </div>
    );
};

export default Comment;