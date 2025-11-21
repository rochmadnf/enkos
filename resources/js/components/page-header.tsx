import { cn } from '@/lib/utils';
import { PageDataProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { ReactNode } from 'react';

interface PageHeaderProps {
    className?: string;
    title?: string;
    description?: string;
    actions?: ReactNode;
}

export function PageHeader({ className, title, description, actions }: PageHeaderProps) {
    const { page } = usePage<PageDataProps>().props;

    return (
        <div className={cn('flex items-center justify-between gap-4', className)}>
            <div className="space-y-1 text-app-primary-950">
                <h1 className="text-2xl font-semibold tracking-wide uppercase sm:text-3xl">{title ?? page.name}</h1>
                <p className="text-sm font-light tracking-wider sm:text-base">{description ?? page.description}</p>
            </div>
            {actions && <div className="shrink-0">{actions}</div>}
        </div>
    );
}
