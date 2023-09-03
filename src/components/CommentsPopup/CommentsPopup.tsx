'use client';

import { FC, useState } from 'react';
import { Badge, Dialog, IconButton } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';

import css from './CommentPopup.module.css';
import { IComment } from '@/interfaces/comment.interface';
import Comment from '@/components/Comment/Comment';

interface IProp {
    comments: IComment[] | undefined,
}

const CommentsPopup:FC<IProp> = ({ comments }) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => {
        setOpen(!open);
    }

    return (
        <div>
            <IconButton onClick={() => setOpen(true)}>
                <Badge color='warning'>
                    <ForumIcon />
                </Badge>
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <div className={css.commentsCard}>
                    <h2>Comments</h2>
                    <div className={css.content}>
                        {comments?.length ?
                            comments.map(comment => <Comment key={comment.id} comment={comment}/>)
                            :
                            <h2>There is no comments yet</h2>
                        }
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default CommentsPopup;