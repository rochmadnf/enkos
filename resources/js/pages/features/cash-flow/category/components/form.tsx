import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectItem } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { SubmitEvent, useEffect } from 'react';
import toast from 'react-hot-toast';
import { CashFlowCategoryDataProps } from '../types';

interface FormModalProps {
    isOpen: boolean;
    selectedCategory?: Omit<CashFlowCategoryDataProps, 'create'>;
    onClose: () => void;
}

const DEFAULT_CATEGORY = {
    name: '',
    id: 1,
    flow_type_id: 1,
};

export function FormModal({ isOpen, selectedCategory, onClose }: FormModalProps) {
    const FormValues = useForm<Omit<CashFlowCategoryDataProps, 'create'>>(DEFAULT_CATEGORY);

    useEffect(() => {
        if (!isOpen) return;

        const values = selectedCategory ?? DEFAULT_CATEGORY;

        FormValues.setData(values);
        FormValues.setDefaults(values);
        FormValues.clearErrors();
    }, [isOpen, selectedCategory]);

    const handleFormSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selectedCategory) {
            FormValues.put(route('cash-flows.categories.update', selectedCategory.id), {
                onSuccess: () => {
                    toast.success('Kategori kas berhasil diperbarui.');
                    FormValues.reset();
                    onClose();
                },
                preserveScroll: true,
                preserveState: true,
                onError: () => {
                    toast.error('Terdapat data yang tidak valid.');
                },
            });
        } else {
            FormValues.post(route('cash-flows.categories.store'), {
                onSuccess: () => {
                    toast.success('Kategori kas berhasil ditambahkan.');
                    FormValues.reset();
                    onClose();
                },
                onError: () => {
                    toast.error('Terdapat data yang tidak valid.');
                },
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                showCloseButton={false}
                className="sm:max-w-106.25"
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>{selectedCategory ? 'Ubah' : 'Tambah'} Kategori Kas</DialogTitle>
                    <DialogDescription>Masukkan detail kategori kas.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                    {/* Nama */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Nama Kategori</Label>
                        <Input
                            id="name"
                            placeholder="Masukkan nama kategori"
                            value={FormValues.data.name}
                            required={true}
                            onChange={(e) => FormValues.setData('name', e.target.value)}
                        />
                        {FormValues.errors.name && <p className="text-sm text-red-500">{FormValues.errors.name}</p>}
                    </div>

                    {/* Jenis */}
                    <div className="space-y-2">
                        <Label htmlFor="flow_type_id">Jenis Kategori</Label>
                        <Select
                            value={FormValues.data.flow_type_id.toString()}
                            onValueChange={(value) => FormValues.setData('flow_type_id', parseInt(value))}
                        >
                            <SelectTrigger id="type">
                                <SelectValue placeholder="Pilih jenis kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Pemasukan</SelectItem>
                                <SelectItem value="2">Pengeluaran</SelectItem>
                            </SelectContent>
                        </Select>
                        {FormValues.errors.flow_type_id && <p className="text-sm text-red-500">{FormValues.errors.flow_type_id}</p>}
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={onClose} disabled={FormValues.processing}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={FormValues.processing}>
                            {FormValues.processing ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
