import { Badge } from '@/components/ui/badge';
import { formatRupiah } from '@/lib/utils';
import type { PaginationMetaProps } from '@/types/pagination';
import type { ColumnDef } from '@tanstack/react-table';
import { CashFlowDataProps } from '../types';

interface ColumnsOptions {
    metadata: PaginationMetaProps;
    onEdit: (user: CashFlowDataProps) => void;
}

export const columns = ({ metadata, onEdit }: ColumnsOptions): ColumnDef<CashFlowDataProps>[] => [
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
        id: 'description',
        header: () => 'Perihal',
        accessorFn: (row) => row.description,
        cell: ({ row }) => {
            return <div>{row.original.description}</div>;
        },
    },
    {
        id: 'type',
        header: () => 'Kategori',
        cell: ({ row }) => {
            const { type } = row.original;
            return <Badge variant={type === 'credit' ? 'success' : 'destructive'}>{type === 'credit' ? 'Pemasukan' : 'Pengeluaran'}</Badge>;
        },
    },
    {
        id: 'amount',
        header: () => 'Nominal',
        cell: ({ row }) => {
            return <div>{formatRupiah(row.original.amount)}</div>;
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
            const { id } = row.original;
            return (
                <div className="flex w-full items-center justify-around gap-x-1.5" role="group" aria-label={`Aksi untuk transaksi ${id}`}>
                    {/* Tombol Edit */}
                    {/* <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 cursor-pointer group-hover/tr:bg-white group-hover/tr:text-yellow-400 hover:bg-yellow-300 hover:text-gray-900"
                        aria-label={`Ubah transaksi ${id}`}
                        onClick={() => onEdit(row.original)}
                    >
                        <PencilLineIcon />
                    </Button> */}

                    {/* Tombol Delete */}
                    {/* <DeleteButton
                        url={'#'}
                        title="Hapus Arus Kas"
                        variant="rect"
                        popSide="bottom"
                        pageName="Arus Kas"
                        className="group-hover/tr:text-destructive [&_svg]:size-4"
                        description="Anda yakin ingin menghapus arus kas ini? Tindakan ini tidak dapat dibatalkan."
                        selectedData={id}
                    /> */}
                </div>
            );
        },
        meta: {
            className: 'align-top',
            width: '100px',
        },
    },
];
