import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/utils';
import { Head, Link, usePage } from '@inertiajs/react';
import { PencilLine, Plus } from 'lucide-react';

export interface RowProps {
    id: number;
    name: string;
    capital_price: {
        id: number;
        price: number;
    };
    selling_price: {
        id: number;
        price: number;
    };
}

export default function ProductIndex() {
    const { products: { data: rows } = { data: [] } } = usePage<{ products: { data: RowProps[] } | undefined }>().props;

    console.log(rows);
    return (
        <AppLayout pageHeader="Data Produk">
            <Head title="Produk"></Head>
            <div className="flex flex-col justify-center gap-y-4">
                <div className="flex items-center justify-end">
                    <Button asChild>
                        <Link href={route('product.create')}>
                            <Plus />
                            Tambah
                        </Link>
                    </Button>
                </div>
                <div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[30px] text-center">No.</TableHead>
                                <TableHead>Nama Produk</TableHead>
                                <TableHead>Harga Modal</TableHead>
                                <TableHead>Harga Jual</TableHead>
                                <TableHead className="w-fit text-center">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell className="text-center font-medium">{index + 1}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{formatRupiah(row.capital_price.price)}</TableCell>
                                    <TableCell>{formatRupiah(row.selling_price.price)}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center">
                                            <Button variant="ghost" size="sm" className="hover:bg-amber-100" asChild>
                                                <Link
                                                    href={route('product.edit', {
                                                        product: row.id,
                                                    })}
                                                >
                                                    <PencilLine className="text-amber-700" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
