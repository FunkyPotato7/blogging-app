'use client';

import { FC, ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { Badge, IconButton } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';

import css from './Feed.module.css';
import { IFeed, IProfile } from '@/interfaces/feed.interface';
import CommentsPopup from '@/components/CommentsPopup/CommentsPopup';

interface IProp {
    feed: IFeed | any,
    user: IProfile,
    children?: ReactNode,
}

const Feed:FC<IProp> = ({ feed, user }) => {
    const { title, body, profile } = feed;
    const supabase = createClientComponentClient();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(!open);
    }

    const createComment = async (comment:string) => {
        const { data, error } = await supabase
            .from('comments')
            .insert([
                { comment, user_id: user.id, feed_id: feed.id },
            ])
            .select()
    }

    return (
        <div className={css.feedWrapper}>
            <div className={css.profile}>
                <div className={css.avatar} onClick={() => router.push(`/profile/${profile.id}`)}>
                    {profile.username ? 'F' : 'U'}
                </div>
                <div className={css.usernameWrapper}>
                    <p><b>{!!profile.username ? profile.username : 'User'}</b></p>
                    <p>{profile.email}</p>
                </div>
            </div>
            <h1>{title}</h1>
            <p className={css.text}>{body}</p>
            <div className={css.commentComponent}>
                {user.role === 'Commentator' &&
                    <Formik
                        initialValues={{
                            comment: '',
                        }}
                        // validationSchema={}
                        onSubmit={({ comment }, { setSubmitting, setValues }) => {
                            createComment(comment);
                            setSubmitting(false);
                            setValues({ comment: '' })
                        }}
                    >
                        <Form className={css.commentForm}>
                            <Field
                                component={TextField}
                                name='comment'
                                label='Comment'
                                variant='outlined'
                                sx={{ width: '100%' }}
                            />
                        </Form>
                    </Formik>
                }
                <IconButton onClick={() => setOpen(true)}>
                    <Badge badgeContent={4} color='warning'>
                        <ForumIcon />
                    </Badge>
                </IconButton>
                <CommentsPopup open={open} handleClose={handleClose} feed_id={feed.id}/>
            </div>
        </div>
    );
};

export default Feed;