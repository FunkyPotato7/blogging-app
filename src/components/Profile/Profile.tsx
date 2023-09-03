'use client';

import { FC } from 'react';
import { usePathname } from 'next/navigation';
import { Button, Chip } from '@mui/material';
import format from 'date-fns/format';

import css from '@/app/profile/[userId]/page.module.css';
import { IUser } from '@/interfaces/auth.interface';
import useProfile from '@/hooks/useProfile';
import useFeedsById from '@/hooks/useFeedsById';

interface IProps {
    user: IUser | null,
}

const Profile:FC<IProps> = ({ user }) => {
    const pathname = usePathname();
    const { data: feeds } = useFeedsById(pathname.slice(9));
    const { data: profile } = useProfile(pathname.slice(9));

    return (
        <div className={css.content}>
            <div className={css.profileCard}>
                <div className={css.avatar}>
                    {!!profile?.username ? profile.username.slice(0, 1).toUpperCase() : 'U'}
                </div>
                <div className={css.userInfo}>
                    <div className={css.wrapper}>
                        <div className={css.username}>
                            <h1>{!!profile?.username ? profile.username : 'User'}</h1>
                            <Chip label={profile?.role} />
                        </div>
                        <p>{profile?.email}</p>
                    </div>
                    <div className={css.wrapper}>
                        <p>Account created: {profile && format(new Date(profile.created_at), 'dd.MM.yyyy' )}</p>
                        {user?.id === profile?.id && <Button variant='contained'>Delete account</Button>}
                    </div>
                </div>
            </div>
            {profile?.role === 'Author' &&
                <div className={css.userFeeds}>
                    <h1>Feeds:</h1>
                    {feeds?.length ?
                        feeds?.map(feed => <div key={feed.id} className={css.feed}>
                            <h1>{feed.title}</h1>
                            <p>{feed.body}</p>
                            <p>{format(new Date(feed.created_at), 'dd.MM.yyyy HH:mm')}</p>
                        </div>)
                        :
                        <h1>This user has no feeds</h1>
                    }
                </div>}
        </div>
    );
};

export default Profile;