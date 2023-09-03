import { useQuery } from 'react-query';

import supabase from '../../supabase';

const getProfile = async (userId: string) => {
    const { data: profile, error } = await supabase.from('profile')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return profile;
}

const useProfile = (userId: string) => {
    return useQuery('profile', () => getProfile(userId));
}

export default useProfile;

