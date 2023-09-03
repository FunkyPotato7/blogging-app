'use client';

import { FC } from 'react';

import css from './RealTimeFeeds.module.css';
import Feed from '@/components/Feed/Feed';
import useFeeds from '@/hooks/useFeeds';
import FeedForm from "@/components/FeedForm/FeedForm";
import useProfile from "@/hooks/useProfile";
import {CircularProgress} from "@mui/material";

interface IProps {
    userId: string,
}

const RealTimeFeeds:FC<IProps> = ({ userId }) => {
    const { data: feeds, isLoading } = useFeeds();
    const { data: profile } = useProfile(userId);

    console.log(isLoading);

    return (
        <div className={css.main}>
            {profile?.role === 'Author' && <FeedForm profile={profile}/>}
            {feeds?.length ?
                feeds?.map(feed => <Feed key={feed.id} feed={feed} user={profile}/>)
                :
                <div className={css.noContent}>
                    {isLoading ? <CircularProgress /> : <h1>There are no feeds yet</h1>}
                </div>
            }
        </div>
    );
};

export default RealTimeFeeds;