import * as Yup from 'yup';

import { regexp } from '@/config/constants';

const signInSchema = Yup.object().shape({
    email: Yup.string()
        .matches(regexp.EMAIL, { message: 'Wrong email pattern' })
        .required(),
    password: Yup.string()
        .min(8, 'Password must be minimum 8 chars')
        .max(20, 'Password must be less than 20 chars')
        .required(),
})

const signUpSchema = Yup.object().shape({
    email: Yup.string()
        .matches(regexp.EMAIL, { message: 'Wrong email pattern' })
        .required(),
    password: Yup.string()
        .min(8, 'Password must be minimum 8 chars')
        .max(20, 'Password must be less than 20 chars')
        .required(),
    role: Yup.string().required(),
    username: Yup.string()
        .min(2, 'Username must be minimum 2 chars')
        .max(20, 'Username must be less than 20 chars')
        .optional(),
})

export {
    signInSchema,
    signUpSchema,
}