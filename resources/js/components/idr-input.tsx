import { ChangeEvent, useState } from 'react';
import { Input } from './input';

export type IDRInputProps = {
    id?: string;
    defaultValue?: string | number;
    onValueChange?: (value: string) => void;
    tabIndex?: number | undefined;
    size?: 'default' | 'lg' | 'md' | 'sm';
};

export function IDRInput({ id, defaultValue = '', onValueChange, size = 'default', tabIndex = undefined }: IDRInputProps) {
    const formatCurrency = (val: string) => {
        val = val.replace(/[^0-9]/g, '');
        return val.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const [formattedValue, setFormattedValue] = useState<string>(formatCurrency(defaultValue.toString()));

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        const formattedValue = formatCurrency(inputValue);

        setFormattedValue(formattedValue);
        if (onValueChange) {
            onValueChange(inputValue.replace(/[a-zA-Z.]/g, ''));
        }
    };

    return (
        <Input
            id={id}
            tabIndex={tabIndex}
            isize={size}
            type="text"
            className="text-right font-mono text-base font-medium tracking-wider"
            value={formattedValue}
            onChange={handleChange}
            placeholder="0"
        />
    );
}
