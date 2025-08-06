import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export function InputErrorMessage({ className, message = 'error text', ...props }: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return (
        <p
            {...props}
            className={cn('invisible mt-1 text-sm text-destructive first-letter:uppercase', message !== 'error text' ? 'visible' : null, className)}
        >
            {message}
        </p>
    );
}
