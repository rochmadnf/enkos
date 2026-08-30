import { DeleteButton } from '@/components/form/delete-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { PaginationMetaProps } from '@/types/pagination';
import type { ColumnDef } from '@tanstack/react-table';
import { PencilLineIcon } from 'lucide-react';
import { CashFlowCategoryDataProps } from '../types';

interface ColumnsOptions {
    metadata: PaginationMetaProps;
    onEdit: (category: CashFlowCategoryDataProps) => void;
}

export const columns = ({ metadata, onEdit }: ColumnsOptions): ColumnDef<CashFlowCategoryDataProps>[] => [
    {
        id: 'number',
        header: () => 'No.',
        cell: ({ row }) => <div>{metadata.from + row.index}.</div>,
        meta: {
            className: 'text-center',
            width: '35px',
        },
    },
    {
        id: 'name',
        header: () => 'Nama Kategori',
        accessorFn: (row) => row.name,
        cell: ({ row }) => {
            return <div>{row.original.name}</div>;
        },
    },
    {
        id: 'type',
        header: () => 'Kategori',
        cell: ({ row }) => {
            const { flow_type_id } = row.original;
            return <Badge variant={flow_type_id === 1 ? 'success' : 'destructive'}>{flow_type_id === 1 ? 'Pemasukan' : 'Pengeluaran'}</Badge>;
        },
    },
    {
        id: 'create',
        header: () => 'Tanggal',
        cell: ({ row }) => {
            return <div>{row.original.create}</div>;
        },
    },
    {
        id: 'actions',
        header: '',
        cell: ({ row }) => {
            const { id, name } = row.original;
            return (
                <div className="flex w-full items-center justify-around gap-x-1.5" role="group" aria-label={`Aksi untuk transaksi ${id}`}>
                    {/* Tombol Edit */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 cursor-pointer group-hover/tr:bg-white group-hover/tr:text-yellow-400 hover:bg-yellow-300 hover:text-gray-900"
                        aria-label={`Ubah transaksi ${id}`}
                        onClick={() => onEdit(row.original)}
                    >
                        <PencilLineIcon />
                    </Button>

                    {/* Tombol Delete */}
                    <DeleteButton
                        url={route('cash-flows.categories.destroy', id)}
                        title="Hapus Arus Kas"
                        variant="rect"
                        popSide="bottom"
                        pageName="Arus Kas"
                        className="group-hover/tr:text-destructive [&_svg]:size-4"
                        description="Anda yakin ingin menghapus arus kas ini? Tindakan ini tidak dapat dibatalkan."
                        selectedData={name}
                    />
                </div>
            );
        },
        meta: {
            className: 'align-top',
            width: '100px',
        },
    },
];
