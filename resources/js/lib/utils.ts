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

export function NumberOrNull(value: number | string): number | null {
    const str = value.toString();

    // Jika kosong, null
    if (str === '') return null;

    // Jika sedang mengetik angka desimal (contoh ".", "-.", "0.") → anggap sementara null
    if (/^-?\d*\.$/.test(str) || str === '-' || str === '.') {
        return null;
    }

    // Konversi ke number, cek valid
    const result = Number(str);
    return isNaN(result) ? null : result;
}

export function formatNumberShort(num: number): string {
    if (num >= 1_000_000_000) {
        return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'M'; // Miliar
    }
    if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'jt'; // Juta
    }
    if (num >= 1_000) {
        return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'rb'; // Ribu
    }
    return num.toString();
}

export function ThousandSeparatorID(num: number): string {
    return num.toLocaleString('id-ID');
}
