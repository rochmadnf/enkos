import { GasLocationDataProps } from '@/pages/gas-location/types';

export type GasCylinderHistoryProps = {
    id: string;
    location_id: string;
    capital_price: number;
    base_price: number;
    retail_price: number;
    stock: number;
    status: number;
};

export type GasCylinderProps = {
    id: string;
    name: string;
    total_stock: number;
    stock: {
        all_condition: number;
        filled: number;
        empty: number;
        damaged: number;
    };
    histories: GasCylinderHistoryProps[];
    create: string;
};

export type StockCardProps = {
    label: string;
    stock: number;
    desc: string;
    variant?: 'default' | 'fill' | 'none' | 'broken' | undefined;
};

export type FormValues = {
    gas_cylinder_id: string | undefined;
    location_id: string | undefined;
    stock: number;
    status: number | undefined;
    capital_price: number;
    base_price: number;
    retail_price: number;
};

export type DataTableShowProps = {
    selectedGasCylinder: Pick<GasCylinderProps, 'id'>['id'] | undefined;
    gasLocations: Pick<GasLocationDataProps, 'id' | 'name'>[];
    conditionTypes: ConditionTypeOptions[];
    histories: GasCylinderHistoryProps[];
};

export type ConditionTypeOptions = {
    id: number;
    name: string;
};

export type UsePageProps = {
    gasCylinder?: { data: GasCylinderProps };
    gasLocations?: { data: Pick<DataTableShowProps, 'gasLocations'>['gasLocations'] };
    conditionTypes: ConditionTypeOptions[];
};
