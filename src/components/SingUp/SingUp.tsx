'use client';

import { FC, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { Button, Link, MenuItem } from '@mui/material';
import { Select, TextField } from 'formik-material-ui';
import { useRouter } from 'next/navigation';

import css from './SignUp.module.css';
import supabase from '../../../supabase';
import { ISignUp } from '@/interfaces/auth.interface';

const SignUP:FC = () => {
    const router = useRouter();
    const [errorMsg, setError] = useState<string | null>(null);

    const signUp = async (formData:ISignUp) => {
        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    role: formData.role
                }
            }
        })

        if(error) {
            setError(error.message);
            console.log(error);
        } else {
            router.push('/sign-in');
        }
    }

    return (
        <div className={css.signUpContainer}>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    // name: '',
                    role: '',
                }}
                onSubmit={(data, { setSubmitting }) => {
                    signUp(data);
                    console.log(data);
                    setSubmitting(false);
                }}
            >{() =>
                <Form className={css.signUpForm}>
                    <Field
                        component={TextField}
                        name='email'
                        label='Email'
                        variant='outlined'
                        sx={{ width: '100%' }}
                    />
                    <Field
                        component={TextField}
                        type='password'
                        name='password'
                        label='Password'
                        variant='outlined'
                        sx={{ width: '100%' }}
                    />
                    <Field
                        component={Select}
                        name='role'
                        label='Role'
                        sx={{ width: '200px' }}
                    >
                        <MenuItem value=''> </MenuItem>
                        <MenuItem value='Author'>Author</MenuItem>
                        <MenuItem value='Commentator'>Commentator</MenuItem>
                    </Field>
                    <div className={css.buttons}>
                        <Button type='submit' variant="contained">SignUp</Button>
                        <Link href={"sign-in"} underline="hover">Already have an account? Sign In.</Link>
                    </div>
                </Form>}
            </Formik>
        </div>
    );
};

export default SignUP;