import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import SignUP from '@/components/SingUp/SingUp';

const SignUpPage = async () => {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getSession();

    if (data?.session) {
        redirect('/');
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SignUP/>
        </div>
    );
};

export default SignUpPage;