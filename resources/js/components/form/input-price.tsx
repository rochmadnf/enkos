import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import { ChangeEvent, ComponentProps, useCallback, useEffect, useRef, useState } from 'react';
import { inputVariants } from '../input';
import { InputErrorMessage } from '../input-error-message';
import { Label } from '../ui/label';

export interface FormInputPriceProps {
    name: string;
    label: string;
    error?: string | undefined;
    value?: number | string;
    onChange?: (value: number | undefined) => void;
    prefix?: string;
}

/**
 * Formats a number to IDR format (using dot as thousand separator)
 * Example: 1000000 -> "1.000.000"
 */
function formatToIDR(value: number | string | undefined): string {
    if (value === undefined || value === null || value === '') return '';

    const numValue = typeof value === 'string' ? parseFloat(value.replace(/\./g, '')) : value;

    if (isNaN(numValue)) return '';

    return numValue.toLocaleString('id-ID');
}

/**
 * Parses IDR formatted string back to number
 * Example: "1.000.000" -> 1000000
 */
function parseFromIDR(value: string): number | undefined {
    if (!value || value.trim() === '') return undefined;

    const cleanValue = value.replace(/\./g, '');
    const numValue = parseInt(cleanValue, 10);

    return isNaN(numValue) ? undefined : numValue;
}

export function FormInputPrice({
    label,
    error,
    value,
    onChange,
    prefix = 'Rp',
    isize = 'md',
    variant = 'default',
    className,
    ...props
}: Omit<ComponentProps<'input'>, 'onChange' | 'value' | 'type'> & FormInputPriceProps & VariantProps<typeof inputVariants>) {
    const [displayValue, setDisplayValue] = useState<string>(() => formatToIDR(value));
    const inputRef = useRef<HTMLInputElement>(null);
    const cursorPosRef = useRef<number | null>(null);

    // Restore cursor position after render
    useEffect(() => {
        if (cursorPosRef.current !== null && inputRef.current) {
            inputRef.current.setSelectionRange(cursorPosRef.current, cursorPosRef.current);
            cursorPosRef.current = null;
        }
    });

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const input = e.target;
            const inputValue = input.value;
            const cursorPosition = input.selectionStart ?? 0;

            // Only allow numbers
            const cleanInput = inputValue.replace(/[^\d]/g, '');

            if (cleanInput === '') {
                setDisplayValue('');
                onChange?.(undefined);
                return;
            }

            const numericValue = parseInt(cleanInput, 10);
            const formattedValue = formatToIDR(numericValue);

            // Calculate new cursor position based on digit count
            let digitsBeforeCursor = 0;
            for (let i = 0; i < cursorPosition && i < inputValue.length; i++) {
                if (/\d/.test(inputValue[i])) {
                    digitsBeforeCursor++;
                }
            }

            // Find position in formatted value with same digit count
            let newCursorPosition = 0;
            let digitCount = 0;
            for (let i = 0; i < formattedValue.length; i++) {
                if (digitCount === digitsBeforeCursor) {
                    newCursorPosition = i;
                    break;
                }
                if (/\d/.test(formattedValue[i])) {
                    digitCount++;
                }
                newCursorPosition = i + 1;
            }

            // Store cursor position for useEffect to apply after render
            cursorPosRef.current = newCursorPosition;

            setDisplayValue(formattedValue);
            onChange?.(numericValue);
        },
        [onChange],
    );

    // Sync display value when external value changes
    const currentDisplayValue = value !== undefined ? formatToIDR(value) : displayValue;

    return (
        <div className="w-full">
            <Label htmlFor={props.name} className="text-[15px] leading-4">
                {label} {props.required ? <span className="text-red-500">*</span> : null}
            </Label>
            <div className="relative mt-2.5">
                {prefix && <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-sm font-medium">{prefix}</span>}
                <input
                    ref={inputRef}
                    id={props.name}
                    type="text"
                    inputMode="numeric"
                    data-slot="input"
                    value={currentDisplayValue}
                    onChange={handleChange}
                    className={cn(inputVariants({ variant, isize }), prefix && 'pl-9', className)}
                    {...props}
                />
            </div>
            <InputErrorMessage message={error} className="mt-2" />
        </div>
    );
}

/**
 * Utility hook for managing IDR price state with Inertia forms
 * Usage:
 * const { displayValue, numericValue, handleChange } = useIDRPrice(initialValue);
 */
export function useIDRPrice(initialValue?: number | string) {
    const [numericValue, setNumericValue] = useState<number | undefined>(() =>
        initialValue !== undefined ? parseFromIDR(String(initialValue)) : undefined,
    );

    const displayValue = formatToIDR(numericValue);

    const handleChange = useCallback((value: number | undefined) => {
        setNumericValue(value);
    }, []);

    const setValue = useCallback((value: number | string | undefined) => {
        if (value === undefined || value === null || value === '') {
            setNumericValue(undefined);
        } else {
            const parsed = typeof value === 'string' ? parseFromIDR(value) : value;
            setNumericValue(parsed);
        }
    }, []);

    return {
        displayValue,
        numericValue,
        handleChange,
        setValue,
    };
}

export { formatToIDR, parseFromIDR };
