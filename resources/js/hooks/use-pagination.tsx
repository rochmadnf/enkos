import { PaginationMetaProps } from '@/types/pagination';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export interface UsePaginationOptions {
    routeName: string;
    onlyProps?: string[];
    defaultPerPage?: number;
    additionalParams?: Record<string, any>;
}

export const usePagination = (
    meta: PaginationMetaProps | undefined,
    { routeName, onlyProps, defaultPerPage = 5, additionalParams = {} }: UsePaginationOptions,
) => {
    const [pageState, setPageState] = useState<number>(meta?.current_page ?? 1);
    const [perPageState, setPerPageState] = useState<number>(meta?.per_page ?? defaultPerPage);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const submitPagination = ({
        page = pageState,
        perPage = perPageState,
        keyword = null,
        ...extraParams
    }: {
        page?: number;
        perPage?: number;
        keyword?: string | null;
        [key: string]: any;
    }) => {
        setIsLoading(true);
        router.get(
            route(routeName),
            {
                keyword,
                page,
                per_page: perPage,
                ...additionalParams,
                ...extraParams,
            },
            {
                replace: true,
                preserveState: true,
                preserveUrl: true,
                only: onlyProps,
                onFinish: () => {
                    setIsLoading(false);
                },
            },
        );
    };

    const setShowDataPerpage = (sum: number) => {
        const currentPage = sum > perPageState ? 1 : pageState;

        setPageState(currentPage);
        setPerPageState(sum);

        submitPagination({ page: currentPage, perPage: sum });
    };

    const setCurrentPage = (pageNumber: number): number => {
        setPageState(pageNumber);
        submitPagination({ page: pageNumber, perPage: perPageState });
        return pageNumber;
    };

    return {
        pageState,
        perPageState,
        setPageState,
        setPerPageState,
        setShowDataPerpage,
        setCurrentPage,
        isLoading,
        setIsLoading,
        submitPagination,
    };
};
