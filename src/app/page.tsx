import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import css from './page.module.css';
import Header from '@/components/Header/Header';
import Feed from '@/components/Feed/Feed';
import FeedForm from "@/components/FeedForm/FeedForm";

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

    const { data: feeds, error: feedError } = await supabase.from('feeds')
        .select('id, title, body, created_at, profile (*), comments (*)')

    const { data: com, error: comEr } = await supabase.from('comments')
        .select('*, profile (*)')

    return (
        <div className={css.main}>
            <Header profile={profile}/>
            <div className={css.content}>
                {profile.role === 'Author' && <FeedForm profile={profile}/>}
                {feeds?.length ?
                    feeds.map(feed => <Feed key={feed.id} feed={feed} user={profile}/>)
                    :
                    <div className={css.noContent}>
                        <h1>There are no feeds yet</h1>
                    </div>
                }
            </div>
        </div>
    );
}

export default Home;
