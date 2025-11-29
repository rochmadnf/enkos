import { Select, SelectContent, selectSizeVariants, SelectTrigger, SelectValue, selectVariants } from '@/components/select';
import { cn } from '@/lib/utils';
import * as SelectPrimitive from '@radix-ui/react-select';
import { VariantProps } from 'class-variance-authority';
import { ComponentProps, PropsWithChildren, ReactNode } from 'react';
import { InputErrorMessage } from '../input-error-message';
import { Label } from '../ui/label';

export type FormSelectProps = {
    label: string;
    error?: string | undefined;
    triggerSize?: VariantProps<typeof selectVariants>['isize'];
    placeholder?: string | ReactNode;
    tabIndex?: number | undefined;
} & ComponentProps<typeof SelectPrimitive.Root>;
export function FormSelect({
    label,
    error,
    triggerSize = 'md',
    children,
    placeholder = 'empty',
    tabIndex,
    ...props
}: PropsWithChildren<FormSelectProps>) {
    return (
        <div className="w-full">
            <Label htmlFor={props.name} className="text-[15px] leading-4">
                {label} {props.required ? <span className="text-red-500">*</span> : null}
            </Label>
            <Select {...props}>
                <SelectTrigger tabIndex={tabIndex} className="mt-2.5" isize={triggerSize}>
                    <SelectValue placeholder={placeholder === 'empty' ? `-- Pilih ${label} --` : placeholder} />
                </SelectTrigger>
                <SelectContent className={cn(selectSizeVariants[triggerSize ?? 'md'], 'h-auto')}>{children}</SelectContent>
            </Select>
            <InputErrorMessage message={error} className="mt-2" />
        </div>
    );
}
