'use client';

import { Button } from '@mui/material';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from 'next/navigation';

import css from './Header.module.css';

const Header = () => {
    const supabase = createClientComponentClient();
    const router = useRouter();

    const logout = async () => {
        const { error } = await supabase.auth.signOut()
        console.log(error);
        router.push('/sign-in');
    }

    return (
        <div className={css.header}>
            <div className={css.logo}></div>
            <h1>Welcome!</h1>
            <div className={css.buttons}>
                <div className={css.avatar}></div>
                <Button variant="contained" sx={{ width: 100 }} onClick={logout}>Logout</Button>
            </div>
        </div>
    );
};

export default Header;