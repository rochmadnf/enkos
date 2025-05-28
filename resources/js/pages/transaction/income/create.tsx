import { Input } from '@/components/input';
import { InputErrorMessage } from '@/components/input-error-message';
import InputUpDown from '@/components/input-updown';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/utils';
import { RowProps as ProductRowProps } from '@/pages/product';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';

type FormValues = {
    product_id: number | null;
    name: string;
    quantity: number;
    capital_price: number;
    selling_price: number;
    subtotal: number;
};

export default function IncomeCreate() {
    const { products: { data: rows } = { data: [] } } = usePage<{ products: { data: ProductRowProps[] } | undefined }>().props;

    const form = useForm<FormValues>({
        product_id: null,
        name: '',
        quantity: 1,
        capital_price: 0,
        selling_price: 0,
        subtotal: 0,
    });

    const addNewTransactionIncome: FormEventHandler = (e) => {
        e.preventDefault();

        console.log(form.data);

        form.post(route('income.store'), {
            preserveScroll: true,
            replace: true,
            onError: () => {
                toast.error('Terdapat data yang tidak valid.');
            },
            onSuccess: () => {
                form.reset();
                form.clearErrors();
                toast.success('Transaksi Penjualan baru berhasil ditambah.');
            },
        });
    };

    const whenProductSelected = (e: string) => {
        const selectedProduct = e.split('+');

        form.setData('selling_price', Number(selectedProduct[1]));
        form.setData('capital_price', Number(selectedProduct[2]));
        form.setData('product_id', Number(selectedProduct[0]));
        form.setData('subtotal', Number(selectedProduct[1]) * form.data.quantity);
    };

    const whenQtyChanged = (qty: number) => {
        form.setData('quantity', qty);

        if (form.data.product_id !== null) {
            form.setData('subtotal', qty * form.data.selling_price);
        }
    };

    return (
        <AppLayout pageHeader="Tambah Transaksi Penjualan">
            <Head title="Tambah Transaksi Penjualan"></Head>
            <div className="flex items-center justify-center space-y-6 rounded-lg border border-slate-900/10 py-12">
                <form className="flex w-lg max-w-xl flex-col gap-y-4" onSubmit={addNewTransactionIncome}>
                    <div className="space-y-1.5">
                        <Label className="text-base" htmlFor="name">
                            Pilih Produk <span className="text-red-500">*</span>
                        </Label>

                        <Select onValueChange={(e) => whenProductSelected(e)}>
                            <SelectTrigger className="h-11 w-full text-base">
                                <SelectValue placeholder="Produk" />
                            </SelectTrigger>
                            <SelectContent>
                                {rows.map((row) => (
                                    <SelectItem key={row.id} value={[row.id, row.selling_price.price, row.capital_price.price].join('+')}>
                                        {row.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <InputErrorMessage message={form.errors.product_id} className="mt-2" />
                    </div>

                    <div className="flex flex-col items-center gap-y-2.5 lg:flex-row lg:gap-x-4">
                        <div className="w-full space-y-1.5">
                            <Label htmlFor="quantity" className="text-base">
                                Jumlah
                            </Label>
                            <InputUpDown defaultValue={form.data.quantity} minValue={1} onValueChange={(e) => whenQtyChanged(e)} />
                        </div>

                        <div className="w-full space-y-1.5">
                            <Label htmlFor="selling_price" className="text-base">
                                Harga Jual
                            </Label>
                            <Input
                                id="selling_price"
                                isize="md"
                                value={formatRupiah(form.data.selling_price)}
                                disabled
                                className="text-right font-mono text-base font-medium tracking-wider"
                            />
                        </div>
                    </div>

                    <div className="w-full space-y-1.5">
                        <Label htmlFor="subtotal" className="text-base">
                            Sub Total
                        </Label>
                        <Input
                            id="subtotal"
                            isize="md"
                            value={formatRupiah(form.data.subtotal)}
                            disabled
                            className="text-right font-mono text-base font-medium tracking-wider"
                        />
                    </div>

                    <div className="flex items-center gap-x-4">
                        <Button disabled={form.processing} size="lg">
                            Simpan
                        </Button>
                        <Button variant={'outline-destructive'} size="lg" asChild>
                            <Link href={route('income.index')}>Batal</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
