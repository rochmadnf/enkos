import { PaginationMetaProps } from '@/types/pagination';

export interface CashFlowDataProps {
    id: string;
    category: {
        id: number;
        name: string;
        flow_type_id: number;
    };
    description: string;
    amount: number;
    create: string;
}

export interface CashFlowsIndexProps {
    resources: {
        data: CashFlowDataProps[];
        meta: PaginationMetaProps;
    };
    balance: {
        expense: number;
        income: number;
        net: number;
    };
}
