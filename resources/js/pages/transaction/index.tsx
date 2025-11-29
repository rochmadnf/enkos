import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { ThousandSeparatorID } from '@/lib/utils';
import { PageDataProps } from '@/types';
import { PaginationMetaProps } from '@/types/pagination';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon, EditIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { TransactionProps } from './types';

type UsePageProps = PageDataProps & {
    transactions: { data: TransactionProps[]; meta: PaginationMetaProps };
};

const PER_PAGE_LIST = [5, 10, 25, 50, 100];

export default function TransactionIndex() {
    const { page, transactions: { data: rows, meta } = { data: [], meta: undefined } } = usePage<UsePageProps>().props;

    const [perPage, setPerPage] = useState(meta?.per_page || 10);
    const [currentPage, setCurrentPage] = useState(meta?.current_page || 1);
    const [isLoading, setIsLoading] = useState(false);

    const handlePageChange = (page: number) => {
        setIsLoading(true);
        setCurrentPage(page);
        router.get(
            route('transaction.index'),
            { page, per_page: perPage },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['transactions'],
                onFinish: () => setIsLoading(false),
            },
        );
    };

    const handlePerPageChange = (value: string) => {
        const newPerPage = parseInt(value);
        setIsLoading(true);
        setPerPage(newPerPage);
        setCurrentPage(1);
        router.get(
            route('transaction.index'),
            { per_page: newPerPage, page: 1 },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['transactions'],
                onFinish: () => setIsLoading(false),
            },
        );
    };

    const handleDelete = (id: string, transactionDate: string) => {
        if (confirm(`Apakah Anda yakin ingin menghapus transaksi tanggal ${transactionDate}? Stok akan dikembalikan.`)) {
            router.delete(route('transaction.destroy', id), {
                preserveScroll: true,
                onSuccess: () => {
                    router.reload({ only: ['transactions'] });
                },
            });
        }
    };

    return (
        <>
            <Head title="Transaksi Kasir">
                <meta name="description" content="Daftar Transaksi" />
            </Head>
            <div className="space-y-6 p-6">
                {/* header */}
                <div className="space-y-1 text-app-primary-950">
                    <h1 className="text-2xl font-semibold tracking-wide uppercase sm:text-3xl">{page.name}</h1>
                    <p className="text-sm font-light tracking-wider sm:text-base">{page.description}</p>
                </div>

                {/* content */}
                <section className="rounded-lg border border-app-primary-300">
                    {/* Add button */}
                    <div className="flex w-full flex-row items-center justify-end border-b border-b-app-primary-300 p-4">
                        <Link href={route('transaction.create')}>
                            <Button className="flex items-center gap-2 bg-app-primary-500 hover:bg-app-primary-600">
                                <PlusIcon className="h-4 w-4" />
                                Buat Transaksi
                            </Button>
                        </Link>
                    </div>

                    {/* list of data */}
                    <div className="px-4 py-6">
                        <div className="overflow-hidden rounded-md border border-app-primary-300">
                            <table className="w-full">
                                <thead className="bg-app-primary-500 text-app-primary-50">
                                    <tr>
                                        <th className="border-r border-app-primary-300 px-4 py-3 text-left">Tanggal</th>
                                        <th className="border-r border-app-primary-300 px-4 py-3 text-left">Lokasi</th>
                                        <th className="border-r border-app-primary-300 px-4 py-3 text-left">Tabung Gas</th>
                                        <th className="border-r border-app-primary-300 px-4 py-3 text-left">Tipe Pembelian</th>
                                        <th className="border-r border-app-primary-300 px-4 py-3 text-left">Tipe Harga</th>
                                        <th className="border-r border-app-primary-300 px-4 py-3 text-right">Jumlah</th>
                                        <th className="border-r border-app-primary-300 px-4 py-3 text-right">Harga Satuan</th>
                                        <th className="border-r border-app-primary-300 px-4 py-3 text-right">Total Harga</th>
                                        <th className="px-4 py-3 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={9} className="py-8 text-center">
                                                <div className="flex items-center justify-center">
                                                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-app-primary-200 border-t-app-primary-500"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : rows.length === 0 ? (
                                        <tr>
                                            <td colSpan={9} className="py-8 text-center text-app-primary-500">
                                                Belum ada data transaksi
                                            </td>
                                        </tr>
                                    ) : (
                                        rows.map((transaction, index) => (
                                            <tr
                                                key={transaction.id}
                                                className={`${index % 2 === 0 ? 'bg-white' : 'bg-app-primary-50'} transition-colors hover:bg-app-primary-100/50`}
                                            >
                                                <td className="border-r border-app-primary-300 px-4 py-3">
                                                    {new Date(transaction.transaction_date).toLocaleDateString('id-ID', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                    })}
                                                </td>
                                                <td className="border-r border-app-primary-300 px-4 py-3">{transaction.location.name}</td>
                                                <td className="border-r border-app-primary-300 px-4 py-3">{transaction.gas_cylinder.name}</td>
                                                <td className="border-r border-app-primary-300 px-4 py-3">
                                                    <span
                                                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                                            transaction.purchase_type.value === 1
                                                                ? 'bg-blue-100 text-blue-800'
                                                                : 'bg-purple-100 text-purple-800'
                                                        }`}
                                                    >
                                                        {transaction.purchase_type.label}
                                                    </span>
                                                </td>
                                                <td className="border-r border-app-primary-300 px-4 py-3">
                                                    <span
                                                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                                            transaction.price_type.value === 1
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-orange-100 text-orange-800'
                                                        }`}
                                                    >
                                                        {transaction.price_type.label}
                                                    </span>
                                                </td>
                                                <td className="border-r border-app-primary-300 px-4 py-3 text-right">{transaction.quantity}</td>
                                                <td className="border-r border-app-primary-300 px-4 py-3 text-right">
                                                    Rp {ThousandSeparatorID(transaction.unit_price)}
                                                </td>
                                                <td className="border-r border-app-primary-300 px-4 py-3 text-right font-semibold">
                                                    Rp {ThousandSeparatorID(transaction.total_price)}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Link href={route('transaction.edit', transaction.id)}>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="flex items-center gap-1 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                                                            >
                                                                <EditIcon className="h-3 w-3" />
                                                                Edit
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="flex items-center gap-1 text-red-600 hover:bg-red-50 hover:text-red-700"
                                                            onClick={() => handleDelete(transaction.id, transaction.transaction_date)}
                                                        >
                                                            <TrashIcon className="h-3 w-3" />
                                                            Hapus
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* pagination */}
                    {meta && (
                        <div className="flex items-center justify-between border-t border-app-primary-300 px-4 py-3">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-app-primary-600">Tampilkan:</span>
                                <Select value={perPage.toString()} onValueChange={handlePerPageChange}>
                                    <SelectTrigger className="w-20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {PER_PAGE_LIST.map((value) => (
                                            <SelectItem key={value} value={value.toString()}>
                                                {value}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <span className="text-sm text-app-primary-600">dari {meta.total} data</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" onClick={() => handlePageChange(1)} disabled={currentPage === 1 || isLoading}>
                                    <ChevronFirstIcon className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1 || isLoading}
                                >
                                    <ChevronLeftIcon className="h-4 w-4" />
                                </Button>
                                <span className="text-sm text-app-primary-600">
                                    Halaman {currentPage} dari {meta.last_page}
                                </span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === meta.last_page || isLoading}
                                >
                                    <ChevronRightIcon className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handlePageChange(meta.last_page)}
                                    disabled={currentPage === meta.last_page || isLoading}
                                >
                                    <ChevronLastIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}

TransactionIndex.layout = (page: ReactNode) => <AppLayout children={page} />;
