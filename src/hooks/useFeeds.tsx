import { useQuery } from 'react-query';

import supabase from '../../supabase';

const getFeeds = async () => {
    const { data: feeds, error } = await supabase
        .from('feeds')
        .select('id, title, body, created_at, profile (*), comments (*)')
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return feeds;
}

const useFeeds = () => {
    return useQuery('feeds', () => getFeeds());
}

export default useFeeds;
