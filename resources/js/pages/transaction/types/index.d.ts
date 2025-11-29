export type TransactionProps = {
    id: string;
    transaction_date: string;
    location_id: string;
    gas_cylinder_id: string;
    location: {
        id: string;
        name: string;
    };
    gas_cylinder: {
        id: string;
        name: string;
    };
    purchase_type: {
        value: number;
        label: string;
    };
    price_type: {
        value: number;
        label: string;
    };
    quantity: number;
    unit_price: number;
    total_price: number;
    created_at: string;
};

export type PurchaseTypeOption = {
    id: number;
    name: string;
};

export type PriceTypeOption = {
    id: number;
    name: string;
};

export type LocationOption = {
    id: string;
    name: string;
};

export type GasCylinderOption = {
    id: string;
    name: string;
    stock: {
        filled: number;
    };
};

export type GasCylinderHistoryProps = {
    id: string;
    location_id: string;
    capital_price: number;
    base_price: number;
    retail_price: number;
    stock: number;
    status: number;
};
