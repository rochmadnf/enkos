import { IDRInput } from '@/components/idr-input';
import { Input } from '@/components/input';
import { InputErrorMessage } from '@/components/input-error-message';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';

type FormValues = {
    name: string;
    capital_price: null | number;
    selling_price: null | number;
};

export default function ProductCreate() {
    const form = useForm<FormValues>({
        name: '',
        capital_price: null,
        selling_price: null,
    });

    const addNewProduct: FormEventHandler = (e) => {
        e.preventDefault();

        form.post(route('product.store'), {
            preserveScroll: true,
            replace: true,
            onError: () => {
                toast.error('Terdapat data yang tidak valid.');
            },
            onSuccess: () => {
                toast.success('Produk baru berhasil ditambah.');
            },
        });
    };

    return (
        <AppLayout pageHeader="Tambah Produk">
            <Head title="Tambah Produk"></Head>
            <div className="flex items-center justify-center space-y-6 rounded-lg border border-slate-900/10 py-12">
                <form className="flex w-lg max-w-xl flex-col gap-y-4" onSubmit={addNewProduct}>
                    <div className="space-y-1.5">
                        <Label className="text-base" htmlFor="name">
                            Nama Produk <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            autoFocus
                            name="name"
                            isize="md"
                            autoComplete="name"
                            className="mt-2"
                            value={form.data.name}
                            onChange={(e) => form.setData('name', e.target.value)}
                            tabIndex={1}
                        />
                        <InputErrorMessage message={form.errors.name} className="mt-2" />
                    </div>

                    <div className="flex flex-col items-center gap-y-2.5 lg:flex-row lg:gap-x-4">
                        <div className="w-full space-y-1.5">
                            <Label htmlFor="capital_price" className="text-base">
                                Harga Modal <span className="text-red-500">*</span>
                            </Label>
                            <IDRInput
                                id="capital_price"
                                size="md"
                                defaultValue={form.data?.capital_price === null ? '0' : form.data?.capital_price.toString()}
                                onValueChange={(e) => form.setData('capital_price', Number(e))}
                                tabIndex={2}
                            />
                            <InputErrorMessage message={form.errors.capital_price} className="mt-2" />
                        </div>

                        <div className="w-full space-y-1.5">
                            <Label htmlFor="selling_price" className="text-base">
                                Harga Jual <span className="text-red-500">*</span>
                            </Label>
                            <IDRInput
                                id="selling_price"
                                size="md"
                                defaultValue={form.data?.selling_price === null ? '0' : form.data?.selling_price.toString()}
                                onValueChange={(e) => form.setData('selling_price', Number(e))}
                                tabIndex={3}
                            />
                            <InputErrorMessage message={form.errors.selling_price} className="mt-2" />
                        </div>
                    </div>

                    <div className="flex items-center gap-x-4">
                        <Button disabled={form.processing} size="lg">
                            Simpan
                        </Button>
                        <Button variant={'outline-destructive'} size="lg" asChild>
                            <Link href={route('product.index')}>Batal</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
