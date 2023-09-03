'use client';

import { FC } from 'react';
import { Field, Form, Formik } from 'formik';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { TextField } from 'formik-material-ui';
import { Button } from '@mui/material';

import css from './FeedForm.module.css';
import {INewFeed, IProfile} from '@/interfaces/feed.interface';
import { creteFeedSchema } from '@/validators/feed.validator';

interface IProps {
    profile: IProfile,
}

const FeedForm:FC<IProps> = ({ profile }) => {
    const supabase = createClientComponentClient();

    const createFeed = async (formData:INewFeed) => {
        await supabase.from('feeds')
            .insert([
                { title: formData.title, body: formData.body, user_id: profile.id },
            ])
            .select()
    }

    return (
        <div className={css.formWrapper}>
            <Formik
                initialValues={{
                    title: '',
                    body: ''
                }}
                validationSchema={creteFeedSchema}
                onSubmit={(data, { setSubmitting, setValues }) => {
                    createFeed(data);
                    setSubmitting(false);
                    setValues({ title: '', body: '' })
                }}
            >{({ values }) =>
                <Form className={css.form}>
                    <Field
                        component={TextField}
                        type='text'
                        multiline
                        name='body'
                        label="What's new?!"
                        variant='outlined'
                        sx={{ width: '100%', margin: '5px' }}

                    />
                    {values.body && <Field
                        component={TextField}
                        type='text'
                        multiline
                        name='title'
                        label="Give your feed a title!"
                        variant='outlined'
                        sx={{ width: '100%', margin: '5px' }}
                    />}
                    <Button type='submit' variant='contained' sx={{ borderRadius: '20px' }}>Post</Button>
                </Form>}
            </Formik>
        </div>
    );
};

export default FeedForm;