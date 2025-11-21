import { FormInput } from '@/components/form/input';
import { Button } from '@/components/ui/button';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { Popover } from '@radix-ui/react-popover';
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

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <Tooltip open={isHovered && !open}>
                <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
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
                    </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Ubah Data</p>
                </TooltipContent>
            </Tooltip>

            <PopoverContent
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
                className="w-96 border-app-primary-300"
                side="left"
                // align="start"
                sideOffset={-35}
            >
                <div className="mb-4 space-y-1">
                    <h4 className="text-xl leading-none font-medium text-app-primary-950">Edit Tabung Gas</h4>
                    <p className="text-sm text-muted-foreground">Perbarui informasi tabung gas.</p>
                </div>
                <form onSubmit={updateGasCylinderType} className="space-y-2">
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

                    <div className="flex justify-between gap-x-2">
                        <Button type="submit" variant={'primary'} className="w-1/2" disabled={form.processing}>
                            {form.processing ? 'Memperbarui...' : 'Ubah'}
                        </Button>
                        <Button
                            className="w-1/2"
                            type="button"
                            variant="destructive"
                            onClick={() => {
                                form.resetAndClearErrors();
                                setOpen(false);
                            }}
                            disabled={form.processing}
                        >
                            Batal
                        </Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}
