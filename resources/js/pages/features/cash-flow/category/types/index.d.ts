import { PaginationMetaProps } from '@/types/pagination';

export interface CashFlowCategoryDataProps {
    id: number;
    name: string;
    flow_type_id: number;
    create: string;
}

export interface CashFlowsCategoryIndexProps {
    resources: {
        data: CashFlowCategoryDataProps[];
        meta: PaginationMetaProps;
    };
}
