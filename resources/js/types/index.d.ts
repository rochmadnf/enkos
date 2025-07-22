import type { Config } from 'ziggy-js';

export interface SharedData {
    auth: {
        user: User;
    };
    app: {
        office_name: string;
    };
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    username: string;
    avatar: string | null;
    role: string;
    permissions: string[];
}
