import { TooltipContent, Tooltip as TooltipRoot, TooltipTrigger } from '@/components/ui/tooltip';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { ComponentProps } from 'react';

export interface TooltipProps {
    label: string;
}

export function Tooltip({ label, children, ...props }: TooltipProps & ComponentProps<typeof TooltipPrimitive.Content>) {
    return (
        <TooltipRoot>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent {...props}>
                <p>{label}</p>
            </TooltipContent>
        </TooltipRoot>
    );
}
