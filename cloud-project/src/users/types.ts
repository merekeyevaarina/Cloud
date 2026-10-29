export type PublicUser = {
    id:string;
    firstName: string;
    lastName: string;
    email: string;
}

export type RegisteredUser = PublicUser & {
    sessionId: string;
}

export type LoginResult = {
    id: string;
    email: string;
    sessionId: string;
}

export type LoginResponse = {
    id: string;
    email: string;
}

export type SessionUser = {
    id: string;
    email: string;
}