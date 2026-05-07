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

export type PageDataProps = {
    page: {
        uuid: string;
        name: string;
        description: string;
        breadcrumbs: {
            id: string;
            label: string;
            href: string;
        }[];
    };
    [key: string]: unknown;
};

export type ColorCombinationProps = {
    bg: string;
    text: string;
};

export type SelectOptionProps = {
    id: string;
    label: string;
};
