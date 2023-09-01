export interface IFeed {
    id: number,
    created_at: string,
    title: string,
    body: string,
    profile: IProfile,
}

export interface INewFeed {
    title: string,
    body: string,
}

export interface IProfile {
    id: string,
    created_at: string,
    username: string | null,
    email: string,
    role: string ,
}