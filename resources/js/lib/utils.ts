import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getInitialName(name: string) {
    return name
        .match(/(^\S\S?|\b\S)?/g)
        ?.join('')
        .match(/(^\S|\S$)?/g)
        ?.join('')
        .toUpperCase();
}

export const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        currency: 'IDR',
    }).format(value);
};
