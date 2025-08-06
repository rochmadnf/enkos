import { Input, inputVariants } from '@/components/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';
import { InputErrorMessage } from '../input-error-message';

export interface FormInputProps {
    name: string;
    error: string | undefined;
    label: string;
}

export function FormInput({
    label,
    error,
    isize = 'md',
    variant = 'default',
    className,
    ...props
}: Omit<ComponentProps<'input'>, 'form'> & FormInputProps & VariantProps<typeof inputVariants>) {
    return (
        <div className="w-full">
            <Label htmlFor={props.name} className="text-[15px] leading-4">
                {label} {props.required ? <span className="text-red-500">*</span> : null}
            </Label>
            <Input id={props.name} isize={isize} variant={variant} className={cn('mt-2.5', className)} {...props} />
            <InputErrorMessage message={error} className="mt-2" />
        </div>
    );
}
