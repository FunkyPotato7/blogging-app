import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import SignIn from '@/components/SignIn/SignIn';

const SignInPage = async () => {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getSession();

    if (data?.session) {
        redirect('/');
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SignIn/>
        </div>
    );
};

export default SignInPage;