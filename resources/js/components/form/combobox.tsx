import { Combobox, ComboboxOption, ComboboxProps } from '@/components/ui/combobox';
import { Label } from '@/components/ui/label';
import { ReactNode } from 'react';
import { InputErrorMessage } from '../input-error-message';

export interface FormComboboxProps extends Omit<ComboboxProps, 'onChange'> {
    label: string;
    error?: string | undefined;
    onChange?: (value: string, option?: ComboboxOption) => void;
    required?: boolean;
    helperText?: ReactNode;
}

export function FormCombobox({ label, error, onChange, required = false, helperText, className, ...props }: FormComboboxProps) {
    return (
        <div className="w-full">
            <Label htmlFor={props.name} className="text-[15px] leading-4">
                {label} {required ? <span className="text-red-500">*</span> : null}
            </Label>
            <div className="mt-2.5">
                <Combobox {...props} onChange={onChange} />
            </div>
            {helperText && <p className="mt-2 text-sm text-muted-foreground">{helperText}</p>}
            <InputErrorMessage message={error} className="mt-2" />
        </div>
    );
}
