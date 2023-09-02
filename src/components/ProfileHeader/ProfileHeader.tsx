'use client';

import { Button } from '@mui/material';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

import css from './ProfileHeader.module.css';

const ProfileHeader = () => {
    const supabase = createClientComponentClient();
    const router = useRouter();

    const logout = async () => {
        const { error } = await supabase.auth.signOut()
        router.push('/sign-in');
    }

    return (
        <div className={css.header}>
            <div className={css.logo}>MYBLOG</div>
            <h1>Profile</h1>
            <div className={css.buttons}>
                <Button variant="contained" sx={{ width: 100 }} onClick={() => router.push('/')}>Back</Button>
                <Button variant="contained" sx={{ width: 100 }} onClick={logout}>Logout</Button>
            </div>
        </div>
    );
};

export default ProfileHeader;