'use client';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { usePathname } from 'next/navigation';
import { Button, Chip } from '@mui/material';
import format from 'date-fns/format';

import css from './page.module.css';
import Feed from '@/components/Feed/Feed';
import ProfileHeader from '@/components/ProfileHeader/ProfileHeader';
import { IUser } from '@/interfaces/auth.interface';
import {IFeed, IProfile} from '@/interfaces/feed.interface';

const ProfilePage = () => {
    const supabase = createClientComponentClient();
    const [user, setUser ] = useState<IUser | null>(null);
    const [profile, setProfile ] = useState<IProfile | null>(null);
    const [feeds, setFeeds] = useState<IFeed[] | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        supabase.auth.getUser().then(({ data } ) => setUser(data.user));
        supabase.from('profile')
            .select('*')
            .eq('id', pathname.slice(9))
            .single()
            .then(({ data }) => setProfile(data));
        supabase.from('feeds')
            .select('id, title, body, created_at, profile (*)')
            .eq('user_id', pathname.slice(9))
            .order('created_at', { ascending: false })
            .then(({ data }) => setFeeds(data));
    }, [pathname, supabase]);

    return (
        <div className={css.profile}>
            <ProfileHeader/>
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
        </div>
    );
};
//Author Commentator
export default ProfilePage;