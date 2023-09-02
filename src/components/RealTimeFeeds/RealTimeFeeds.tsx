'use client';

import { FC, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

import {IFeed, IProfile} from '@/interfaces/feed.interface';
import Feed from '@/components/Feed/Feed';


interface IProps {
    feeds: IFeed[],
    profile: IProfile,
}

const RealTimeFeeds:FC<IProps> = ({ feeds, profile }) => {
    const supabase = createClientComponentClient();
    const router = useRouter()

    useEffect(() => {
        const channel = supabase.channel('realtime todo')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'feeds'
            }, () => {
                router.refresh();
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel);
        }
    }, [supabase, router])

    return (
        <div style={{ width: '100%', display: "flex", flexDirection: "column", alignItems: 'center' }}>
            {feeds.map(feed => <Feed key={feed.id} feed={feed} user={profile}/>)}
        </div>
    );
};

export default RealTimeFeeds;