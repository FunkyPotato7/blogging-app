'use client';

import { FC, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { Button, Link, MenuItem } from '@mui/material';
import { Select, TextField } from 'formik-material-ui';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

import css from './SignUp.module.css';
import { ISignUp } from '@/interfaces/auth.interface';
import { signUpSchema } from '@/validators/auth.validator';
import { roles } from '@/config/constants';

const SignUP:FC = () => {
    const supabase = createClientComponentClient();
    const router = useRouter();
    const [errorMsg, setError] = useState<string | null>(null);

    const signUp = async (formData:ISignUp) => {
        const { error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    role: formData.role,
                    username: formData.username
                }
            }
        })

        if(error) {
            setError(error.message);
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
                    username: '',
                    role: '',
                }}
                validationSchema={signUpSchema}
                onSubmit={(data, { setSubmitting }) => {
                    signUp(data);
                    console.log(data);
                    setSubmitting(false);
                }}
            >{({ errors, touched }) =>
                <Form className={css.signUpForm}>
                    <Field
                        component={TextField}
                        name='email'
                        label='Email'
                        variant='outlined'
                        error={ !!errorMsg || (errors.email && touched.email) }
                        helperText={ errorMsg }
                        sx={{ width: '100%', height: 60 }}
                    />
                    <Field
                        component={TextField}
                        type='password'
                        name='password'
                        label='Password'
                        variant='outlined'
                        sx={{ width: '100%', height: 60 }}
                    />
                    <Field
                        component={TextField}
                        type='text'
                        name='username'
                        label='Username'
                        variant='outlined'
                        sx={{ width: '100%', height: 60 }}
                    />
                    <Field
                        component={Select}
                        name='role'
                        label='Role'
                        sx={{ width: '200px' }}
                    >
                        {roles.map(role => <MenuItem key={role} value={role}>{role === '' ? ' ' : role }</MenuItem>)}
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