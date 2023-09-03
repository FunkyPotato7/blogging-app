import { useQuery } from 'react-query';

import supabase from '../../supabase';

const getFeedsByUserId = async (userId: string) => {
    const { data: feeds, error } = await supabase.from('feeds')
        .select('id, title, body, created_at, profile (*)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

    if (error) {
        throw new Error(error.message);
    }

    return feeds;
}

const useFeedsById = (userId: string) => {
    return useQuery('feedsById', () => getFeedsByUserId(userId));
}

export default useFeedsById;