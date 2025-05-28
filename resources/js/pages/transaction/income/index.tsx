import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/utils';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Inbox, Plus } from 'lucide-react';
import { useState } from 'react';

export type RowProps = {
    id: string;
    buy_date: string;
    product: {
        id: number;
        name: string;
    };
    qty: number;
    price: {
        sell: number;
        capital: number;
    };
    split_date: {
        TGL: string;
        BLN: string;
    };
};

interface TotalProps {
    qty: number;
    price: number;
    profit: number;
}

export default function IncomeIndex() {
    const {
        transactions: { data: rows, total },
    } = usePage<{ transactions: { data: RowProps[]; total: TotalProps } }>().props;

    const [currentMonth, setCurrentMonth] = useState<number>(+new Date().getMonth() + 1);

    const whenMonthSelected = (month: string) => {
        setCurrentMonth(Number(month));

        router.get(
            route('income.index'),
            { set_month: Number(month) },
            {
                preserveScroll: true,
                preserveState: true,
                preserveUrl: true,
                replace: true,
                only: ['transactions'],
            },
        );
    };

    return (
        <AppLayout pageHeader="Data Penjualan">
            <Head title="Penjualan"></Head>
            <div className="flex flex-col justify-center gap-y-4">
                <div className="flex items-center justify-between">
                    {/* right side */}
                    <div className="flex items-center">
                        <div className="flex items-center rounded-md px-4 py-2">
                            Bulan
                            <Select value={currentMonth.toString()} onValueChange={(e) => whenMonthSelected(e)}>
                                <SelectTrigger className="ml-2 w-full px-1.5 py-1.5 text-sm" size="sm">
                                    <SelectValue placeholder="Produk" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[...Array(12).keys()].map((mm) => (
                                        <SelectItem key={mm} value={(mm + 1).toString()}>
                                            {String(mm + 1).padStart(2, '0')}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {/* left side */}
                    <div className="flex items-center">
                        <Button asChild>
                            <Link href={route('income.create')}>
                                <Plus />
                                Tambah
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[30px] text-center">No.</TableHead>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Produk</TableHead>
                                <TableHead>Harga</TableHead>
                                <TableHead className="w-[42px] text-center">Qty</TableHead>
                                <TableHead className="text-right">Jumlah</TableHead>
                                <TableHead className="w-5 text-center">#TGL</TableHead>
                                <TableHead className="w-5 text-center">#BLN</TableHead>
                                <TableHead className="text-right">Pendapatan</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.length > 0 ? (
                                rows.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell className="text-center font-medium">{index + 1}</TableCell>
                                        <TableCell>{row.buy_date}</TableCell>
                                        <TableCell>{row.product.name}</TableCell>
                                        <TableCell>{formatRupiah(row.price.sell)}</TableCell>
                                        <TableCell className="text-center">{row.qty}</TableCell>
                                        <TableCell className="text-right">{formatRupiah(row.price.sell * row.qty)}</TableCell>
                                        <TableCell className="text-center">{row.split_date.TGL}</TableCell>
                                        <TableCell className="text-center">{row.split_date.BLN}</TableCell>
                                        <TableCell className="text-right">
                                            {formatRupiah(row.price.sell * row.qty - row.price.capital * row.qty)}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={9}>
                                        <div className="flex flex-row items-center justify-center py-8 text-base font-medium">
                                            <Inbox className="mr-2 size-6" /> Belum ada transaksi yang tersedia.
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        {rows.length > 0 ? (
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={4}>Total</TableCell>
                                    <TableCell className="text-center">{total.qty}</TableCell>
                                    <TableCell className="text-right">{formatRupiah(total.price)}</TableCell>
                                    <TableCell colSpan={2}>&nbsp;</TableCell>
                                    <TableCell className="text-right">{formatRupiah(total.profit)}</TableCell>
                                </TableRow>
                            </TableFooter>
                        ) : null}
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
