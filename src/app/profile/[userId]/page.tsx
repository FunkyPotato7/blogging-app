import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import css from './page.module.css';
import ProfileHeader from '@/components/ProfileHeader/ProfileHeader';
import Profile from '@/components/Profile/Profile';

const ProfilePage = async () => {
    const supabase = createServerComponentClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className={css.profile}>
            <ProfileHeader/>
            <Profile user={user}/>
        </div>
    );
};

export default ProfilePage;