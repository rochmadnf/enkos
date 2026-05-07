import { PaginationMetaProps } from '@/types/pagination';

export interface CashFlowDataProps {
    id: string;
    type: string;
    description: string;
    ref_col: string;
    amount: number;
    create: string;
}

export interface CashFlowsIndexProps {
    resources: {
        data: CashFlowDataProps[];
        meta: PaginationMetaProps;
    };
}
