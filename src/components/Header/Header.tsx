'use client';

import { FC, ReactNode } from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import css from './Header.module.css';
import useProfile from '@/hooks/useProfile';

interface IProp {
    userId: string,
    children?: ReactNode,
}

const Header:FC<IProp> = ({ userId }) => {
    const supabase = createClientComponentClient();
    const router = useRouter();
    const { data: profile } = useProfile(userId);

    const logout = async () => {
        await supabase.auth.signOut()
        router.push('/sign-in');
        router.refresh();
    }

    return (
        <div className={css.header}>
            <div className={css.logo}>MYBLOG</div>
            <h1>Welcome!</h1>
            <div className={css.buttons}>
                <div className={css.avatar} onClick={() => router.push(`/profile/${profile.id}`)}>
                    {!!profile?.username ? profile.username.slice(0, 1).toUpperCase() : 'U'}
                </div>
                <Button variant="contained" sx={{ width: 100 }} onClick={logout}>Logout</Button>
            </div>
        </div>
    );
};

export default Header;