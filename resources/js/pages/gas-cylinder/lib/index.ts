import { StockCardProps } from '../types';

export const StockCardColors: Record<
    NonNullable<Pick<StockCardProps, 'variant'>['variant']>,
    { card: string; cardDesc: string; cardTitle: string; contentText: string }
> = {
    default: {
        card: 'border-app-primary-300',
        cardDesc: 'text-app-primary-600',
        cardTitle: 'text-app-primary-950',
        contentText: 'text-app-primary-500',
    },
    fill: {
        card: 'border-green-300 bg-green-50/50',
        cardDesc: 'text-green-700',
        cardTitle: 'text-green-900',
        contentText: 'text-green-600',
    },
    none: {
        card: 'border-gray-300 bg-gray-100/50',
        cardDesc: 'text-gray-700',
        cardTitle: 'text-gray-900',
        contentText: 'text-gray-600',
    },
    broken: {
        card: 'border-red-300',
        cardDesc: 'text-red-700',
        cardTitle: 'text-red-900',
        contentText: 'text-red-600',
    },
};
