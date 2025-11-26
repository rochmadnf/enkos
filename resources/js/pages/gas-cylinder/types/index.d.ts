export type GasCylinderProps = {
    id: string;
    name: string;
    total_stock: number;
    create: string;
};

export type StockCardProps = {
    label: string;
    stock: number;
    desc: string;
    variant?: 'default' | 'fill' | 'none' | 'broken' | undefined;
};
