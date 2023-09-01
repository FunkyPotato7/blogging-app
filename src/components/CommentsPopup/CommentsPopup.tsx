import { FC } from 'react';
import { Dialog } from '@mui/material';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface IProp {
    open: boolean,
    handleClose: () => void,
    feed_id: number,
}

const CommentsPopup:FC<IProp> = async ({ open, handleClose, feed_id }) => {
    const supabase = createClientComponentClient();

    let { data: comments, error } = await supabase
        .from('comments')
        .select('*')

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <div>
                HEY
            </div>
        </Dialog>
    );
};

export default CommentsPopup;