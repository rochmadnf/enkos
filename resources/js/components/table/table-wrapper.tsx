import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface DataTableWrapperProps {
    children: ReactNode;
    className?: string;
    toolbar?: ReactNode;
}

export function DataTableWrapper({ children, className, toolbar }: DataTableWrapperProps) {
    return (
        <section className={cn('rounded-lg border border-app-primary-300', className)}>
            {toolbar && <div className="flex w-full flex-row items-center justify-end border-b border-b-app-primary-300 p-4">{toolbar}</div>}
            <div className="px-4 py-6">
                <div className="overflow-hidden rounded-md border border-app-primary-300">
                    <table className="w-full">{children}</table>
                </div>
            </div>
        </section>
    );
}

interface TableHeaderCellProps {
    children: ReactNode;
    colSpan?: number;
    rowSpan?: number;
    className?: string;
}

export function TableHeaderCell({ children, colSpan, rowSpan, className }: TableHeaderCellProps) {
    return (
        <th colSpan={colSpan} rowSpan={rowSpan} className={cn('border-r border-app-primary-300 py-2 last:border-r-0', className)}>
            {children}
        </th>
    );
}

interface TableCellProps {
    children: ReactNode;
    className?: string;
    align?: 'left' | 'center' | 'right';
}

export function TableCell({ children, className, align = 'left' }: TableCellProps) {
    const alignClasses = {
        left: '',
        center: 'text-center',
        right: 'text-right',
    };

    return <td className={cn('border-r border-e-app-primary-300 p-2.5 last:border-r-0', alignClasses[align], className)}>{children}</td>;
}
