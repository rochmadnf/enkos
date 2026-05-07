import { PaginationMetaProps } from "@/types/pagination";

export interface UsersDataProps {
    id: string;
    name: string;
}

export interface UsersIndexProps {
    resources: {
        data: UsersDataProps[];
        meta: PaginationMetaProps;
    };
}