import { DeleteButton } from '@/components/form/delete-button';
import { Button } from '@/components/ui/button';
import type { PaginationMetaProps } from '@/types/pagination';
import type { ColumnDef } from '@tanstack/react-table';
import { PencilLineIcon } from 'lucide-react';
import { UsersDataProps } from '../types';

interface ColumnsOptions {
    metadata: PaginationMetaProps;
    onEdit: (user: UsersDataProps) => void;
}

export const columns = ({ metadata, onEdit }: ColumnsOptions): ColumnDef<UsersDataProps>[] => [
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
        header: () => 'Nama Lengkap',
        accessorFn: (row) => row.name,
        cell: ({ row }) => {
            return <div>{row.original.name}</div>;
        },
    },
    {
        id: 'username',
        header: () => 'Username',
        accessorFn: (row) => row.username,
        cell: ({ row }) => {
            return <div>{row.original.username}</div>;
        },
    },
    {
        id: 'role',
        header: () => 'Peran',
        accessorFn: (row) => row.role,
        cell: ({ row }) => {
            return <div>{row.original.role}</div>;
        },
    },
    {
        id: 'actions',
        header: '',
        cell: ({ row }) => {
            const { id, name } = row.original;
            return (
                <div className="flex w-full items-center justify-around gap-x-1.5" role="group" aria-label={`Aksi untuk ${name}`}>
                    {/* Tombol Edit */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 cursor-pointer group-hover/tr:bg-white group-hover/tr:text-yellow-400 hover:bg-yellow-300 hover:text-gray-900"
                        aria-label={`Ubah ${name}`}
                        onClick={() => onEdit(row.original)}
                    >
                        <PencilLineIcon />
                    </Button>

                    {/* Tombol Delete */}
                    <DeleteButton
                        url={'#'}
                        title="Hapus Akun"
                        variant="rect"
                        popSide="bottom"
                        pageName="Akun Pengguna"
                        className="group-hover/tr:text-destructive [&_svg]:size-4"
                        description="Anda yakin ingin menghapus akun ini? Tindakan ini tidak dapat dibatalkan."
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
