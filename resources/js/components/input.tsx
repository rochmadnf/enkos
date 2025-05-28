import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const inputVariants = cva(
    cn(
        'placeholder:text-muted-foreground file:text-foreground selection:text-primary-foreground flex w-full min-w-0 rounded-md border border-slate-900/25 bg-transparent px-3 py-2 text-base tracking-wider shadow-xs transition-[color,box-shadow] duration-300 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:ring-[2.5px] focus-visible:ring-offset-2',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
    ),
    {
        variants: {
            variant: {
                default: 'focus-visible:border-slate-900/35 focus-visible:ring-slate-900/95 selection:bg-primary',
                primary: 'focus-visible:border-blue-500/45 focus-visible:ring-blue-500/75 selection:bg-blue-600',
            },
            isize: {
                default: 'h-10 md:text-sm',
                sm: 'h-9 md:text-sm',
                md: 'h-11 md:text-base',
                lg: 'h-12 md:text-lg',
            },
        },
        defaultVariants: {
            variant: 'default',
            isize: 'default',
        },
    },
);

function Input({ className, variant, isize, type, ...props }: React.ComponentProps<'input'> & VariantProps<typeof inputVariants>) {
    return <input type={type} data-slot="input" className={cn(inputVariants({ variant, isize, className }))} {...props} />;
}

export { Input };
