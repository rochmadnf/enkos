import { LoadingState } from '@/components/custom/loading-state';
import { DatabaseIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface TableLoadingStateProps {
    colSpan: number;
    message?: string;
}

export function TableLoadingState({ colSpan, message = 'Memuat data...' }: TableLoadingStateProps) {
    return (
        <tr>
            <td colSpan={colSpan} className="py-12">
                <div className="flex flex-col items-center justify-center gap-y-4 text-slate-900/70">
                    <LoadingState className="size-20 fill-app-primary-500" />
                    <span className="font-light text-app-primary-950">{message}</span>
                </div>
            </td>
        </tr>
    );
}

interface TableEmptyStateProps {
    colSpan: number;
    message?: string;
    icon?: ReactNode;
}

export function TableEmptyState({ colSpan, message = 'Belum ada data yang tersedia.', icon }: TableEmptyStateProps) {
    return (
        <tr>
            <td colSpan={colSpan} className="py-12">
                <div className="flex flex-col items-center justify-center gap-y-4 text-slate-900/70">
                    {icon ?? <DatabaseIcon className="size-20 text-app-primary-950" />}
                    <span className="font-light text-app-primary-950">{message}</span>
                </div>
            </td>
        </tr>
    );
}
