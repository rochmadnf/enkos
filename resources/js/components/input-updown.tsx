import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Button, Group, Input, NumberField } from 'react-aria-components';

type InputUpDownProps = {
    defaultValue?: number;
    minValue?: number;
    onValueChange?: (value: number) => void;
    tabIndex?: number | undefined;
};

export default function InputUpDown({ defaultValue = 0, minValue = 0, onValueChange }: InputUpDownProps) {
    const handleChange = (value: number) => {
        if (onValueChange) {
            onValueChange(value);
        }
    };

    return (
        <NumberField defaultValue={defaultValue} minValue={minValue} onChange={handleChange} aria-label="input with increment and decrement">
            <div className="*:not-first:mt-2">
                <Group className="data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-11 w-full items-center overflow-hidden rounded-md border border-slate-900/35 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] data-disabled:opacity-50 data-focus-within:border-slate-900/35 data-focus-within:ring-[2.5px] data-focus-within:ring-slate-900/95 data-focus-within:ring-offset-2">
                    <Input className="bg-background text-foreground h-11 flex-1 px-3 py-2 tabular-nums" />
                    <div className="flex h-[calc(100%+2px)] flex-col">
                        <Button
                            slot="increment"
                            className="bg-background hover:bg-accent hover:text-foreground -me-px flex h-1/2 w-6 flex-1 items-center justify-center border border-slate-900/35 text-sm text-slate-900/50 transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <ChevronUpIcon size={12} aria-hidden="true" />
                        </Button>
                        <Button
                            slot="decrement"
                            className="bg-background hover:bg-accent hover:text-foreground -me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border border-slate-900/35 text-sm text-slate-900/50 transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <ChevronDownIcon size={12} aria-hidden="true" />
                        </Button>
                    </div>
                </Group>
            </div>
        </NumberField>
    );
}
