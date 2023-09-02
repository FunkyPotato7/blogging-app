import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import css from './page.module.css';
import SignUP from '@/components/SingUp/SingUp';

const SignUpPage = async () => {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getSession();

    if (data?.session) {
        redirect('/');
    }

    return (
        <div className={css.signUpPage}>
            <div className={css.signUpComponent}>
                <h1>Sign Up</h1>
                <SignUP/>
            </div>
        </div>
    );
};

export default SignUpPage;