import { FormPopover } from '@/components/form/form-popover';
import { FormInput } from '@/components/form/input';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
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

    const handleCancel = () => {
        form.reset();
        setOpen(false);
    };

    return (
        <FormPopover
            open={open}
            onOpenChange={setOpen}
            trigger={
                <Button
                    className="rounded-none border-app-primary-300 text-app-primary-900 shadow-none first:rounded-s-md last:rounded-e-md hover:border-app-primary-500 hover:bg-app-primary-500 hover:text-white focus-visible:z-10"
                    variant="outline"
                    disabled={open}
                >
                    <PlusIcon className="-ms-1" aria-hidden="true" />
                    Tambah
                </Button>
            }
            title="Tambah Jenis Tabung"
            description="Silakan lengkapi form dibawah ini."
            onSubmit={addNewGasCylinderType}
            onCancel={handleCancel}
            isProcessing={form.processing}
        >
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
                tabIndex={2}
                required
                type="number"
                min={1}
                name="total_stock"
                value={form.data.total_stock}
                onChange={(e) => form.setData('total_stock', e.target.valueAsNumber)}
                error={form.errors.total_stock}
            />
        </FormPopover>
    );
}
