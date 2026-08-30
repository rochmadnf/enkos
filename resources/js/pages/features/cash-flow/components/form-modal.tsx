import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from '@/components/ui/base/combobox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/base/dialog';
import { Item, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/base/item';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { SubmitEvent, useEffect } from 'react';
import toast from 'react-hot-toast';

type CategoryItemProps = {
    id: number;
    name: string;
    flow_type_id: number;
};

type FormDataProps = {
    cash_flow_category_id?: number;
    perfom_at: Date;
    description: string;
    amount: number;
    ref_col: string;
};

interface CashFlowFormModalProps {
    isOpen: boolean;
    selectedItem?: FormDataProps;
    onClose: () => void;
}

type cfCategoriesProps = {
    data: CategoryItemProps[];
};

const DEFAULT_FORM_DATA: FormDataProps = {
    cash_flow_category_id: undefined,
    amount: 1,
    description: '',
    perfom_at: new Date(),
    ref_col: '',
};

export function FormModal({ isOpen, onClose, selectedItem }: CashFlowFormModalProps) {
    const { cfCategories } = usePage<{ cfCategories: cfCategoriesProps }>().props;

    const formData = useForm<FormDataProps>(selectedItem !== undefined ? selectedItem : DEFAULT_FORM_DATA);

    useEffect(() => {
        if (!isOpen) return;

        const values = selectedItem ?? DEFAULT_FORM_DATA;

        formData.setData(values);
        formData.setDefaults(values);
        formData.clearErrors();
    }, [isOpen, selectedItem]);

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        formData.transform((data) => ({ ...data, perfom_at: format(data.perfom_at, 'yyyy-MM-dd') }));

        formData.post(route('cash-flows.store'), {
            onSuccess: () => {
                formData.reset();
                onClose();
            },
            onError: () => {
                toast.error('Terdapat data yang tidak valid.');
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Tambah Arus Kas</DialogTitle>
                    <DialogDescription>Masukkan detail arus kas baru.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="cash_flow_category">Kategori Arus Kas</Label>
                        <Combobox
                            items={cfCategories.data.filter((cat) => cat.name !== '')}
                            itemToStringLabel={(category: CategoryItemProps) => category.name}
                            onValueChange={(e) => formData.setData('cash_flow_category_id', e?.id)}
                        >
                            <ComboboxInput className="h-10" id="cash_flow_category" placeholder="Pilih Kategori" />
                            <ComboboxContent className={'z-99'}>
                                <ComboboxEmpty>Kategori belum tersedia.</ComboboxEmpty>
                                <ComboboxList>
                                    {(category) => (
                                        <ComboboxItem key={category.id} value={category}>
                                            <Item size="xs" className="p-0">
                                                <ItemContent>
                                                    <ItemTitle className="whitespace-nowrap">{category.name}</ItemTitle>
                                                    <ItemDescription>{category.flow_type_id === 1 ? 'Pemasukan' : 'Pengeluaran'}</ItemDescription>
                                                </ItemContent>
                                            </Item>
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    </div>

                    {/* Tanggal */}
                    <div className="space-y-2">
                        <Label htmlFor="perform_at">Tanggal Transaksi</Label>
                        <DatePicker value={formData.data.perfom_at} onChange={(date) => date && formData.setData('perfom_at', date)} />
                        {formData.errors.perfom_at && <p className="text-sm text-red-500">{formData.errors.perfom_at}</p>}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Deskripsi</Label>
                        <Input
                            id="description"
                            placeholder="Masukkan deskripsi arus kas"
                            value={formData.data.description}
                            onChange={(e) => formData.setData('description', e.target.value)}
                        />
                        {formData.errors.description && <p className="text-sm text-red-500">{formData.errors.description}</p>}
                    </div>

                    {/* Amount */}
                    <div className="space-y-2">
                        <Label htmlFor="amount">Nominal</Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="Masukkan nominal"
                            value={formData.data.amount}
                            onChange={(e) => formData.setData('amount', parseInt(e.target.value) || 0)}
                        />
                        <p className="text-xs text-blue-500">Rp{new Intl.NumberFormat('id-ID').format(formData.data.amount)}</p>
                        {formData.errors.amount && <p className="text-sm text-red-500">{formData.errors.amount}</p>}
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={onClose} disabled={formData.processing}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={formData.processing}>
                            {formData.processing ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
