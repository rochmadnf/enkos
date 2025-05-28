import { type Config } from 'ziggy-js';

export interface User {
    id: number | string;
    username: string;
    name: string;
    avatar: string;
    role: string;
    permissions: string[];
}

export interface AuthenticatedUser {
    user: User;
}

export type SharedData<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: AuthenticatedUser;
    ziggy: Config & { location: string };
};
