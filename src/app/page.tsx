import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import css from './page.module.css';
import Header from '@/components/Header/Header';
import RealTimeFeeds from '@/components/RealTimeFeeds/RealTimeFeeds';

const Home = async () => {
    const supabase = createServerComponentClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser();

    if(!user) {
        redirect('/sign-in');
    }

    return (
        <div className={css.main}>
            <Header userId={user.id}/>
            <RealTimeFeeds userId={user.id}/>
        </div>
    );
}

export default Home;
