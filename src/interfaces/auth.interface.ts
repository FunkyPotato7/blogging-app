export interface ISignUp {
    email: string,
    password: string,
    role: string,
    username: string | null
}

export interface ISignIn {
    email: string,
    password: string,
}