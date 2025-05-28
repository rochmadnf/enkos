import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export function InputErrorMessage({ className, message, ...props }: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return (
        <p {...props} className={cn('text-destructive mt-1 text-sm first-letter:uppercase', className)}>
            {message}
        </p>
    );
}
