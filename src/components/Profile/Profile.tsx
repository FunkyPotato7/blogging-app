// import {FC, ReactNode} from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button, Chip } from '@mui/material';
import format from 'date-fns/format';

import css from './Profile.module.css';
import ProfileHeader from '@/components/ProfileHeader/ProfileHeader';
import Feed from '@/components/Feed/Feed';

// interface IProp {
//     pathname: string,
// }
// :FC<IProp>
const Profile = async () => {
    const supabase = createClientComponentClient();
    const { data: { user } } = await supabase.auth.getUser();

    // console.log(pathname.slice(9));
    const pathname = '/profile/82e1a3d2-89bc-4c53-b84b-8a68748c1790';

    const { data: feeds, error: er2 } = await supabase.from('feeds')
        .select('id, title, body, created_at, profile (*)')
        .eq('user_id', pathname.slice(9))

    const { data: profile, error } = await supabase.from('profile')
        .select('*')
        .eq('id', pathname.slice(9))
        .single()

    return (
        <div className={css.profile}>
            <ProfileHeader/>
            <div className={css.profileCard}>
                <div className={css.avatar}>
                    {!!profile.username ? profile.username.slice(0, 1).toUpperCase() : 'U'}
                </div>
                <div className={css.userInfo}>
                    <div className={css.wrapper}>
                        <div className={css.username}>
                            <h1>{!!profile.username ? profile.username : 'User'}</h1>
                            <Chip label={profile.role} />
                        </div>
                        <p>{profile.email}</p>
                    </div>
                    <div className={css.wrapper}>
                        <p>Account created: {format(new Date(profile.created_at), 'dd.MM.yyyy' )}</p>
                        {user?.id === profile.id && <Button variant='contained'>Delete account</Button>}
                    </div>
                </div>
            </div>
            <h1>Feeds:</h1>
            {feeds?.length ?
                feeds?.map(feed => <Feed key={feed.id} feed={feed}/>)
                :
                <h1>This user has no feeds</h1>
            }
        </div>
    );
};

export default Profile;