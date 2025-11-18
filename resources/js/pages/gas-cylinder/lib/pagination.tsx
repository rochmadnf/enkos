import { PaginationMetaProps } from '@/types/pagination';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export const PER_PAGE_LIST: number[] = [5, 10, 25, 50, 100];

export const submitPagination = ({ page = 1, perPage = 5, keyword = null }: { page?: number; perPage?: number; keyword?: string | null }) => {
    router.get(
        route('gas_cylinder.index'),
        {
            keyword,
            page,
            per_page: perPage,
        },
        {
            replace: true,
            preserveState: true,
            only: ['gasCylinders'],
        },
    );
};

export const usePaginationState = (meta: PaginationMetaProps | undefined) => {
    const [pageState, setPageState] = useState<number>(meta?.current_page ?? 1);
    const [perPageState, setPerPageState] = useState<number>(meta?.per_page ?? 5);

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
    };
};
