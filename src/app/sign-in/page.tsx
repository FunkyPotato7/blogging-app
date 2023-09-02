import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import css from './page.module.css';
import SignIn from '@/components/SignIn/SignIn';

const SignInPage = async () => {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getSession();

    if (data?.session) {
        redirect('/');
    }

    return (
        <div className={css.signInPage}>
            <div className={css.signInComponent}>
                <h1>Sign In</h1>
                <SignIn/>
            </div>
        </div>
    );
};

export default SignInPage;