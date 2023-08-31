'use client';

import { FC, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { Button, Link, MenuItem } from '@mui/material';
import { TextField, Select } from 'formik-material-ui';

import css from './SignIn.module.css';
import supabase from '../../../supabase';
import { ISignIn } from '@/interfaces/auth.interface';
import {useRouter} from "next/navigation";

const SignIn:FC = () => {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const signIn = async (formData:ISignIn) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
        })

        if(error) {
            setErrorMsg(error.message);
            console.log(error);
        } else {
            router.push('/');
        }
    }

    return (
        <div className={css.loginContainer}>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={(data, { setSubmitting }) => {
                    signIn(data);
                    console.log(data);
                    setSubmitting(false);
                }}
            >{() =>
                <Form className={css.loginForm}>
                    <Field
                        component={TextField}
                        name='email'
                        label='Email'
                        variant='outlined'
                        error={ !!errorMsg }
                        helperText={ errorMsg }
                        sx={{ width: '100%' }}
                    />
                    <Field
                        component={TextField}
                        type='password'
                        name='password'
                        label='Password'
                        variant='outlined'
                        error={ !!errorMsg }
                        helperText={ errorMsg }
                        sx={{ width: '100%' }}
                    />
                    <div className={css.buttons}>
                        <Button type='submit' variant="contained">SignIn</Button>
                        <Link href={"sign-up"} underline="hover">Need to create account?</Link>
                    </div>
                </Form>}
            </Formik>
        </div>
    );
};

export default SignIn;