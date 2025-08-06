import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import { Input, Label, NumberField, NumberFieldProps } from 'react-aria-components';
import { inputVariants } from '../input';
import { InputErrorMessage } from '../input-error-message';

interface InputProps {
    placeholder?: string;
    size?: VariantProps<typeof inputVariants>['isize'];
    variant?: VariantProps<typeof inputVariants>['variant'];
    class?: string;
    tabIndex?: number;
}

export interface FormInputNumber {
    label: {
        class: string;
        name: string;
    };
    input?: InputProps;
    error?: string | undefined;
}

export function FormInputNumber({ label, input, error, ...props }: FormInputNumber & NumberFieldProps) {
    const inputProps: Required<Pick<InputProps, 'size' | 'variant'>> & Partial<InputProps> = {
        size: 'md',
        variant: 'default',
        ...input,
    };
    return (
        <NumberField className={cn('w-full', props.className)} {...props}>
            <Label
                className={cn(
                    'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
                    label.class,
                )}
            >
                {label.name} {props.isRequired ? <span className="text-red-500">*</span> : null}
            </Label>
            <Input
                tabIndex={inputProps.tabIndex}
                placeholder={inputProps.placeholder}
                className={cn(inputVariants({ variant: inputProps.variant, isize: inputProps.size }), inputProps.class ?? '')}
            />
            <InputErrorMessage message={error} className="mt-2" />
        </NumberField>
    );
}
