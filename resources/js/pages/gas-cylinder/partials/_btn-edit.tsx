import { FormPopover } from '@/components/form/form-popover';
import { FormInput } from '@/components/form/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { PencilIcon } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';
import { GasCylinderProps } from '..';

export type FormValues = {
    name: string;
    total_stock: number;
};

type ButtonEditProps = {
    data: GasCylinderProps;
    pageState: number;
    perPageState: number;
};

export function ButtonEdit({ data, pageState, perPageState }: ButtonEditProps) {
    const [open, setOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const form = useForm<FormValues>({
        name: data.name,
        total_stock: data.total_stock,
    });

    const updateGasCylinderType: FormEventHandler = (e) => {
        e.preventDefault();

        if (form.isDirty) {
            form.patch(
                route('gas_cylinder.update', {
                    gas_id: data.id,
                    page: pageState,
                    per_page: perPageState,
                }),
                {
                    onError: () => {
                        toast.error('Terdapat data yang tidak valid. Silakan periksa kembali.');
                    },
                    onSuccess: () => {
                        setOpen(false);
                        toast.success(`${form.data.name} berhasil diperbarui.`);
                    },
                    only: ['gasCylinders'],
                    preserveState: true,
                    preserveScroll: true,
                },
            );
        } else {
            toast.error('Belum ada perubahan data.');
        }
    };

    const handleCancel = () => {
        form.resetAndClearErrors();
        setOpen(false);
    };

    return (
        <FormPopover
            open={open}
            onOpenChange={setOpen}
            trigger={
                <Tooltip open={isHovered && !open}>
                    <TooltipTrigger asChild>
                        <button
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className={cn(
                                'inline-flex cursor-pointer items-center justify-center rounded-full border border-app-primary-300 bg-white p-2 text-amber-500 transition duration-150 hover:border-amber-500 hover:bg-amber-500 hover:text-slate-950 data-[state=open]:border-amber-500 data-[state=open]:bg-amber-500 data-[state=open]:text-slate-950 [&_svg]:pointer-events-none [&_svg]:size-4',
                                open ? 'border-amber-500 bg-amber-500 text-slate-950' : '',
                            )}
                            disabled={open}
                        >
                            <PencilIcon />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Ubah Data</p>
                    </TooltipContent>
                </Tooltip>
            }
            title="Edit Tabung Gas"
            description="Perbarui informasi tabung gas."
            onSubmit={updateGasCylinderType}
            onCancel={handleCancel}
            submitLabel="Ubah"
            isProcessing={form.processing}
            sideOffset={-35}
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
