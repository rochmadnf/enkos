import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router, usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

interface CashFlowFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: () => void;
}

export function CashFlowFormModal({ isOpen, onClose, onSubmit }: CashFlowFormModalProps) {
    const { errors } = usePage().props;
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        router.post(
            route('cash-flows.store'),
            {
                type,
                description,
                amount: parseInt(amount),
            },
            {
                onSuccess: () => {
                    setLoading(false);
                    setType('');
                    setDescription('');
                    setAmount('');
                    onClose();
                    onSubmit?.();
                },
                onError: () => {
                    setLoading(false);
                },
            },
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Tambah Arus Kas</DialogTitle>
                    <DialogDescription>Masukkan detail arus kas baru. ref_col akan diisi secara otomatis.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Type */}
                    <div className="space-y-2">
                        <Label htmlFor="type">Jenis Arus Kas</Label>
                        <Select value={type} onValueChange={setType}>
                            <SelectTrigger id="type">
                                <SelectValue placeholder="Pilih jenis arus kas" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="credit">Pemasukan</SelectItem>
                                <SelectItem value="debit">Pengeluaran</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Deskripsi</Label>
                        <Input
                            id="description"
                            placeholder="Masukkan deskripsi arus kas"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                    </div>

                    {/* Amount */}
                    <div className="space-y-2">
                        <Label htmlFor="amount">Nominal</Label>
                        <Input id="amount" type="number" placeholder="Masukkan nominal" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
