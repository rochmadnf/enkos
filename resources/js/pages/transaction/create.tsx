import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { ThousandSeparatorID } from '@/lib/utils';
import { PageDataProps } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { SaveIcon, XIcon } from 'lucide-react';
import { FormEventHandler, ReactNode, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { GasCylinderOption, LocationOption, PriceTypeOption, PurchaseTypeOption } from './types';

type UsePageProps = PageDataProps & {
    gasLocations: { data: LocationOption[] };
    purchaseTypes: PurchaseTypeOption[];
    priceTypes: PriceTypeOption[];
};

export default function TransactionCreate() {
    const { page, gasLocations, purchaseTypes, priceTypes } = usePage<UsePageProps>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        transaction_date: new Date().toISOString().split('T')[0],
        location_id: '',
        gas_cylinder_id: '',
        purchase_type: '',
        price_type: '',
        quantity: 0,
        unit_price: 0,
        total_price: 0,
    });

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [maxStock, setMaxStock] = useState<number>(0);
    const [availablePrices, setAvailablePrices] = useState<{ base: number; retail: number }>({ base: 0, retail: 0 });
    const [availableCylinders, setAvailableCylinders] = useState<GasCylinderOption[]>([]);

    // Update transaction_date when selectedDate changes
    useEffect(() => {
        setData('transaction_date', selectedDate.toISOString().split('T')[0]);
    }, [selectedDate]);

    // Fetch cylinders by location when location is selected
    useEffect(() => {
        if (data.location_id) {
            fetch(`/transactions/cylinders-by-location?location_id=${data.location_id}`)
                .then((res) => res.json())
                .then((result) => {
                    setAvailableCylinders(result.data || []);
                    // Reset gas_cylinder_id if it's not in the new list
                    if (data.gas_cylinder_id && !result.data.find((c: GasCylinderOption) => c.id === data.gas_cylinder_id)) {
                        setData('gas_cylinder_id', '');
                    }
                })
                .catch(() => {
                    setAvailableCylinders([]);
                    setData('gas_cylinder_id', '');
                });
        } else {
            setAvailableCylinders([]);
            setData('gas_cylinder_id', '');
        }
    }, [data.location_id]);

    // Fetch stock information when location and gas cylinder are selected
    useEffect(() => {
        if (data.location_id && data.gas_cylinder_id) {
            fetch(`/transactions/stock-info?location_id=${data.location_id}&gas_cylinder_id=${data.gas_cylinder_id}`)
                .then((res) => res.json())
                .then((result) => {
                    setMaxStock(result.stock || 0);
                    setAvailablePrices({ base: result.base_price || 0, retail: result.retail_price || 0 });
                })
                .catch(() => {
                    setMaxStock(0);
                    setAvailablePrices({ base: 0, retail: 0 });
                });
        }
    }, [data.location_id, data.gas_cylinder_id]);

    // Calculate total price when quantity or price_type changes
    useEffect(() => {
        if (data.quantity > 0 && data.price_type) {
            const price = data.price_type === '1' ? availablePrices.base : availablePrices.retail;
            setData((prev) => ({
                ...prev,
                unit_price: price,
                total_price: price * data.quantity,
            }));
        }
    }, [data.quantity, data.price_type, availablePrices]);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('transaction.store'), {
            onError: () => {
                toast.error('Terdapat data yang tidak valid. Silakan periksa kembali.');
            },
            onSuccess: () => {
                reset();
                setSelectedDate(new Date());
                setAvailableCylinders([]);
                setMaxStock(0);
                setAvailablePrices({ base: 0, retail: 0 });
                toast.success('Transaksi berhasil disimpan.');
            },
        });
    };

    return (
        <>
            <Head title="Buat Transaksi">
                <meta name="description" content="Form transaksi kasir" />
            </Head>
            <div className="space-y-6 p-6">
                {/* header */}
                <div className="space-y-1 text-app-primary-950">
                    <h1 className="text-2xl font-semibold tracking-wide uppercase sm:text-3xl">{page.name}</h1>
                    <p className="text-sm font-light tracking-wider sm:text-base">{page.description}</p>
                </div>

                {/* form */}
                <section className="rounded-lg border border-app-primary-300 p-6">
                    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                        {/* Tanggal */}
                        <div className="space-y-2">
                            <Label htmlFor="transaction_date">Tanggal Transaksi</Label>
                            <DatePicker value={selectedDate} onChange={(date) => date && setSelectedDate(date)} />
                            {errors.transaction_date && <p className="text-sm text-red-500">{errors.transaction_date}</p>}
                        </div>

                        {/* Lokasi */}
                        <div className="space-y-2">
                            <Label htmlFor="location_id">Lokasi</Label>
                            <Select value={data.location_id} onValueChange={(value) => setData('location_id', value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih lokasi" />
                                </SelectTrigger>
                                <SelectContent>
                                    {gasLocations.data.map((location) => (
                                        <SelectItem key={location.id} value={location.id}>
                                            {location.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.location_id && <p className="text-sm text-red-500">{errors.location_id}</p>}
                        </div>

                        {/* Tabung Gas */}
                        <div className="space-y-2">
                            <Label htmlFor="gas_cylinder_id">Tabung Gas</Label>
                            <Select
                                value={data.gas_cylinder_id}
                                onValueChange={(value) => setData('gas_cylinder_id', value)}
                                disabled={!data.location_id || availableCylinders.length === 0}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue
                                        placeholder={
                                            !data.location_id
                                                ? 'Pilih lokasi terlebih dahulu'
                                                : availableCylinders.length === 0
                                                  ? 'Tidak ada tabung tersedia'
                                                  : 'Pilih tabung gas'
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableCylinders.map((cylinder) => (
                                        <SelectItem key={cylinder.id} value={cylinder.id}>
                                            {cylinder.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.gas_cylinder_id && <p className="text-sm text-red-500">{errors.gas_cylinder_id}</p>}
                        </div>

                        {/* Tipe Pembelian */}
                        <div className="space-y-2">
                            <Label htmlFor="purchase_type">Tipe Pembelian</Label>
                            <Select value={data.purchase_type} onValueChange={(value) => setData('purchase_type', value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih refill atau beli utuh" />
                                </SelectTrigger>
                                <SelectContent>
                                    {purchaseTypes.map((type) => (
                                        <SelectItem key={type.id} value={type.id.toString()}>
                                            {type.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.purchase_type && <p className="text-sm text-red-500">{errors.purchase_type}</p>}
                        </div>

                        {/* Tipe Harga */}
                        <div className="space-y-2">
                            <Label htmlFor="price_type">Tipe Harga</Label>
                            <Select value={data.price_type} onValueChange={(value) => setData('price_type', value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih pangkalan atau eceran" />
                                </SelectTrigger>
                                <SelectContent>
                                    {priceTypes.map((type) => (
                                        <SelectItem key={type.id} value={type.id.toString()}>
                                            {type.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.price_type && <p className="text-sm text-red-500">{errors.price_type}</p>}
                        </div>

                        {/* Jumlah */}
                        <div className="space-y-2">
                            <Label htmlFor="quantity">Jumlah Stok</Label>
                            <Input
                                id="quantity"
                                type="number"
                                min={1}
                                max={maxStock}
                                value={data.quantity}
                                onChange={(e) => setData('quantity', parseInt(e.target.value) || 0)}
                                placeholder="Masukkan jumlah"
                                className="w-full"
                            />
                            {maxStock > 0 && <p className="text-xs text-gray-500">Stok tersedia: {maxStock}</p>}
                            {errors.quantity && <p className="text-sm text-red-500">{errors.quantity}</p>}
                        </div>

                        {/* Total Harga */}
                        <div className="space-y-2">
                            <Label htmlFor="total_price">Total Harga</Label>
                            <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
                                <p className="text-2xl font-bold text-app-primary-950">Rp {ThousandSeparatorID(data.total_price)}</p>
                                {data.unit_price > 0 && <p className="mt-1 text-xs text-gray-500">@ Rp {ThousandSeparatorID(data.unit_price)}</p>}
                            </div>
                            {errors.total_price && <p className="text-sm text-red-500">{errors.total_price}</p>}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <Button type="submit" disabled={processing} className="flex items-center gap-2">
                                <SaveIcon className="h-4 w-4" />
                                Simpan Transaksi
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.visit(route('transaction.index'))}
                                className="flex items-center gap-2"
                            >
                                <XIcon className="h-4 w-4" />
                                Batal
                            </Button>
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
}

TransactionCreate.layout = (page: ReactNode) => <AppLayout children={page} />;
