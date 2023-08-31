import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import {redirect} from "next/navigation";

const Home = async () => {
    const supabase = createServerComponentClient({ cookies })
    const { data: user } = await supabase.auth.getUser();

    console.log(user);
    if(!user) {
        redirect('/sign-in');
    }

    return (
        <div>
            <h1>Welcome!</h1>
        </div>
    );
}

export default Home;
