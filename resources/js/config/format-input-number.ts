export function CoordinatesFormat(): Intl.NumberFormatOptions {
    return {
        style: 'decimal',
        maximumFractionDigits: 16,
        minimumFractionDigits: 6,
    };
}

export function RupiahFormat(): Intl.NumberFormatOptions {
    return {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    };
}
