import { FormInput } from '@/components/form/input';
import { Button } from '@/components/ui/button';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useForm } from '@inertiajs/react';
import { Popover } from '@radix-ui/react-popover';
import { PlusIcon } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';

export type FormValues = {
    name: string;
    total_stock: number;
};

export function ButtonAdd() {
    const [open, setOpen] = useState(false);

    const form = useForm<FormValues>({
        name: '',
        total_stock: 1,
    });

    const addNewGasCylinderType: FormEventHandler = (e) => {
        e.preventDefault();

        form.post(route('gas_cylinder.store'), {
            onError: () => {
                toast.error('Terdapat data yang tidak valid. Silakan periksa kembali.');
            },
            onSuccess: () => {
                form.reset();
                setOpen(false);
                toast.success(`${form.data.name} berhasil ditambahkan.`);
            },
            only: ['gasCylinders'],
            preserveState: true,
        });
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    className="rounded-none border-app-primary-300 text-app-primary-900 shadow-none first:rounded-s-md last:rounded-e-md hover:border-app-primary-500 hover:bg-app-primary-500 hover:text-white focus-visible:z-10"
                    variant="outline"
                    disabled={open}
                >
                    <PlusIcon className="-ms-1" aria-hidden="true" />
                    Tambah
                </Button>
            </PopoverTrigger>
            <PopoverContent
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
                className="w-96 border-app-primary-300"
                side="left"
                align="start"
            >
                <div className="mb-4 space-y-1">
                    <h4 className="text-xl leading-none font-medium text-app-primary-950">Tambah Jenis Tabung</h4>
                    <p className="text-sm text-muted-foreground">Silakan lengkapi form dibawah ini.</p>
                </div>
                <form onSubmit={addNewGasCylinderType} className="space-y-2">
                    <FormInput
                        label="Nama Tabung"
                        tabIndex={1}
                        required
                        autoFocus
                        name="name"
                        value={form.data.name}
                        onChange={(e) => form.setData('name', e.target.value)}
                        error={form.errors.name}
                    />

                    <FormInput
                        label="Total Stok"
                        tabIndex={3}
                        required
                        type="number"
                        min={1}
                        name="total_stock"
                        value={form.data.total_stock}
                        onChange={(e) => form.setData('total_stock', e.target.valueAsNumber)}
                        error={form.errors.total_stock}
                    />

                    <div className="flex justify-between gap-x-2">
                        <Button type="submit" className="w-1/2">
                            Simpan
                        </Button>
                        <Button
                            className="w-1/2"
                            type="button"
                            variant="destructive"
                            onClick={() => {
                                form.reset();
                                setOpen(false);
                            }}
                        >
                            Batal
                        </Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}
