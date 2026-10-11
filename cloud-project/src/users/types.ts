export type PublicUser = {
    id:string;
    firstName: string;
    lastName: string;
    email: string;
}

export type RegisteredUser = PublicUser & {
    sessionId: string;
}
