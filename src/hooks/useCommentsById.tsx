import { useQuery } from 'react-query';

import supabase from '../../supabase';

const getCommentsByFeedId = async (feedId: number) => {
    const { data: comments, error } = await supabase.from('comments')
        .select('*, profile (*)')
        .eq('feed_id', feedId)
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return comments;
}

const useCommentsById = (feedId: number) => {
    return useQuery(['comments', feedId], () => getCommentsByFeedId(feedId));
}

export default useCommentsById;