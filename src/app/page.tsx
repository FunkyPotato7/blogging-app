import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import css from './page.module.css';
import Header from '@/components/Header/Header';
import Feed from '@/components/Feed/Feed';
import {IFeed} from "@/interfaces/feed.interface";

const Home = async () => {
    const supabase = createServerComponentClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser();

    if(!user) {
        redirect('/sign-in');
    }

    const { data: profile, error } = await supabase.from('profile')
        .select('*')
        .eq('id', user.id)
        .single()
    console.log(profile);

    const { data: feeds, error: er2 } = await supabase.from('feeds')
        .select('id, title, body, created_at, profile (*)')
    // console.log(feeds);
    // console.log(er2);

    return (
        <div className={css.main}>
            <Header/>
            {profile.role === 'Author' && <h1>FORM</h1>}
            {feeds?.map(feed => <Feed key={feed.id} feed={feed}/>)}
        </div>
    );
}

export default Home;
