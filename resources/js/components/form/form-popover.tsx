import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { FormEventHandler, ReactNode } from 'react';

export interface FormPopoverProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    trigger: ReactNode;
    title: string;
    description?: string;
    onSubmit: FormEventHandler;
    onCancel: () => void;
    children: ReactNode;
    submitLabel?: string;
    cancelLabel?: string;
    isProcessing?: boolean;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
    className?: string;
    disabled?: boolean;
}

export function FormPopover({
    open,
    onOpenChange,
    trigger,
    title,
    description,
    onSubmit,
    onCancel,
    children,
    submitLabel = 'Simpan',
    cancelLabel = 'Batal',
    isProcessing = false,
    side = 'left',
    align = 'start',
    sideOffset,
    className,
    disabled = false,
}: FormPopoverProps) {
    return (
        <Popover open={open} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild disabled={disabled}>
                {trigger}
            </PopoverTrigger>
            <PopoverContent
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
                className={cn('w-96 border-app-primary-300', className)}
                side={side}
                align={align}
                sideOffset={sideOffset}
            >
                <div className="mb-4 space-y-1">
                    <h4 className="text-xl leading-none font-medium text-app-primary-950">{title}</h4>
                    {description && <p className="text-sm text-muted-foreground">{description}</p>}
                </div>
                <form onSubmit={onSubmit} className="space-y-2">
                    {children}
                    <div className="flex justify-between gap-x-2">
                        <Button type="submit" className="w-1/2" disabled={isProcessing} variant="primary">
                            {isProcessing ? 'Memproses...' : submitLabel}
                        </Button>
                        <Button className="w-1/2" type="button" variant="destructive" onClick={onCancel} disabled={isProcessing}>
                            {cancelLabel}
                        </Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}
