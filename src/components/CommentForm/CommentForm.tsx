'use client';

import { FC } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Field, Form, Formik } from 'formik';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

import css from './CommentForm.module.css';

interface IProps {
    user_id: string,
    feed_id: number,
}

const CommentForm:FC<IProps> = ({ feed_id, user_id }) => {
    const supabase = createClientComponentClient();

    const createComment = async (comment:string) => {
        await supabase
            .from('comments')
            .insert([
                { comment, user_id, feed_id },
            ])
            .select()
    }

    return (
        <Formik
            initialValues={{
                comment: '',
            }}
            validationSchema={Yup.object().shape({
                comment: Yup.string()
                    .max(500, "'Comment' must be not greater than 500 chars")
                    .required('You can`t send empty comment')
            })}
            onSubmit={({ comment }, { setSubmitting, setValues, setErrors, setTouched }) => {
                createComment(comment);
                setSubmitting(false);
                setValues({ comment: '' })
                setErrors({ comment: '' })
                setTouched({ comment: false })
            }}
        >{({ errors, setErrors, touched }) =>
            <Form className={css.commentForm}>
                <Field
                    component={TextField}
                    name='comment'
                    label='Comment'
                    variant='outlined'
                    multiline
                    error={ !!errors.comment && touched.comment }
                    sx={{ width: '90%' }}
                    onBlur={() => setErrors({ comment: '' })}
                />
                <IconButton type='submit'>
                    <SendIcon/>
                </IconButton>
            </Form>}
        </Formik>
    );
};

export default CommentForm;