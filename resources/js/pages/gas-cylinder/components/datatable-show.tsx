import { DeleteButton } from '@/components/form/delete-button';
import { FormInput } from '@/components/form/input';
import { FormInputPrice } from '@/components/form/input-price';
import { FormSelect } from '@/components/form/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { BanknoteArrowDownIcon, BanknoteIcon, BanknoteXIcon, CoinsIcon, MapPinHouseIcon, PackagePlusIcon, PencilIcon } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';
import { DataTableShowProps, FormValues, GasCylinderHistoryProps } from '../types';

export function DataTableShow({ selectedGasCylinder, gasLocations, conditionTypes, histories }: DataTableShowProps) {
    const [selectedInfo, setSelectedInfo] = useState<'location' | 'price'>('price');
    const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [editingHistory, setEditingHistory] = useState<GasCylinderHistoryProps | null>(null);

    // Mengelompokkan stok berdasarkan lokasi
    const getStockByLocation = () => {
        const locationStocks = new Map<string, { filled: number; empty: number; damaged: number; total: number }>();

        histories.forEach((history) => {
            const existing = locationStocks.get(history.location_id) || { filled: 0, empty: 0, damaged: 0, total: 0 };

            if (history.status === 1) {
                // Isi
                existing.filled += history.stock;
            } else if (history.status === 0) {
                // Kosong
                existing.empty += history.stock;
            } else if (history.status === 2) {
                // Rusak
                existing.damaged += history.stock;
            }
            existing.total += history.stock;

            locationStocks.set(history.location_id, existing);
        });

        return Array.from(locationStocks.entries()).map(([locationId, stocks]) => ({
            locationId,
            ...stocks,
        }));
    };

    const addForm = useForm<FormValues>({
        gas_cylinder_id: selectedGasCylinder,
        stock: 1,
        location_id: undefined,
        status: undefined,
        capital_price: 1,
        base_price: 1,
        retail_price: 1,
    });

    const editForm = useForm<FormValues>({
        gas_cylinder_id: selectedGasCylinder,
        stock: 1,
        location_id: undefined,
        status: undefined,
        capital_price: 1,
        base_price: 1,
        retail_price: 1,
    });

    const addNewStock: FormEventHandler = (e) => {
        e.preventDefault();

        addForm.post(route('gas_cylinder.stock.add'), {
            preserveScroll: true,
            preserveState: true,
            onError: (err) => {
                toast.error('Terdapat kesalahan pada pengisian formulir.');
            },
            onSuccess: () => {
                toast.success('Stok tabung gas berhasil ditambahkan.');
                canceledAddForm();
            },
        });
    };

    const canceledAddForm = () => {
        addForm.clearErrors();
        addForm.reset();
        setOpenFormDialog(false);
    };

    const handleEdit = (history: GasCylinderHistoryProps) => {
        setEditingHistory(history);
        editForm.setData({
            gas_cylinder_id: selectedGasCylinder,
            location_id: history.location_id,
            status: history.status,
            stock: history.stock,
            capital_price: history.capital_price,
            base_price: history.base_price,
            retail_price: history.retail_price,
        });
        setOpenEditDialog(true);
    };

    const updateStock: FormEventHandler = (e) => {
        e.preventDefault();

        if (!editingHistory) return;

        editForm.patch(route('gas_cylinder.stock.update', { history_id: editingHistory.id }), {
            onError: (err) => {
                toast.error('Terdapat kesalahan pada pengisian formulir.');
            },
            onSuccess: () => {
                toast.success('Stok tabung gas berhasil diperbarui.');
                canceledEditForm();
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    const canceledEditForm = () => {
        editForm.clearErrors();
        editForm.reset();
        setEditingHistory(null);
        setOpenEditDialog(false);
    };

    // Menghitung estimasi pendapatan dari tabung kondisi Isi (status === 1)
    const getRevenueEstimates = () => {
        const filledHistories = histories.filter((h) => h.status === 1);

        const totalCapital = filledHistories.reduce((sum, h) => sum + h.stock * h.capital_price, 0);
        const totalBase = filledHistories.reduce((sum, h) => sum + h.stock * h.base_price, 0);
        const totalRetail = filledHistories.reduce((sum, h) => sum + h.stock * h.retail_price, 0);

        return {
            capital: totalCapital,
            base: totalBase,
            retail: totalRetail,
        };
    };

    // Menghitung pendapatan saat ini dari tabung kondisi Kosong (status === 0)
    const getCurrentRevenue = () => {
        const emptyHistories = histories.filter((h) => h.status === 0);

        const totalCapital = emptyHistories.reduce((sum, h) => sum + h.stock * h.capital_price, 0);
        const totalBase = emptyHistories.reduce((sum, h) => sum + h.stock * h.base_price, 0);
        const totalRetail = emptyHistories.reduce((sum, h) => sum + h.stock * h.retail_price, 0);

        return {
            capital: totalCapital,
            base: totalBase,
            retail: totalRetail,
        };
    };

    // Menghitung kerugian dari tabung kondisi Rusak (status === 2)
    const getLostRevenue = () => {
        const damagedHistories = histories.filter((h) => h.status === 2);

        const totalCapital = damagedHistories.reduce((sum, h) => sum + h.stock * h.capital_price, 0);
        const totalBase = damagedHistories.reduce((sum, h) => sum + h.stock * h.base_price, 0);
        const totalRetail = damagedHistories.reduce((sum, h) => sum + h.stock * h.retail_price, 0);

        return {
            capital: totalCapital,
            base: totalBase,
            retail: totalRetail,
        };
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="rounded-md border border-app-primary-300 py-4">
            {/* Header */}
            <div className="space-y-4 border-b border-app-primary-300 px-6 pb-4">
                <div className="flex w-full items-center justify-between">
                    {/* Select Information Detail */}
                    <Select defaultValue={selectedInfo} onValueChange={(value) => setSelectedInfo(value as 'location' | 'price')}>
                        <SelectTrigger className="cursor-pointer border-app-primary-300 px-4 text-left hover:bg-app-primary-50 focus-visible:border-app-primary-500 focus-visible:ring-app-primary-300/50 data-[size=default]:h-14 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0 [&>svg]:hidden">
                            <SelectValue placeholder="Pilih Informasi" />
                        </SelectTrigger>
                        <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                            <SelectItem value="price">
                                <span className="flex items-center gap-2">
                                    <CoinsIcon className="pointer-events-none size-7 text-app-primary-950" />
                                    <span>
                                        <span className="block font-medium text-app-primary-950">Harga</span>
                                        <span className="mt-0.5 block text-xs text-app-primary-900/70">Daftar Harga Stock</span>
                                    </span>
                                </span>
                            </SelectItem>
                            <SelectItem value="location">
                                <span className="flex items-center gap-2">
                                    <MapPinHouseIcon className="pointer-events-none size-7 text-app-primary-950" />
                                    <span>
                                        <span className="block font-medium text-app-primary-950">Lokasi</span>
                                        <span className="mt-0.5 block text-xs text-app-primary-900/70">Daftar Lokasi Stock</span>
                                    </span>
                                </span>
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Button Add New Stock */}
                    <Dialog open={openFormDialog} onOpenChange={setOpenFormDialog}>
                        <DialogTrigger asChild>
                            <Button
                                className="h-12 rounded-md border-app-primary-300 text-app-primary-900 shadow-none transition duration-300 hover:border-app-primary-500 hover:bg-app-primary-500 hover:text-white"
                                variant="outline"
                            >
                                <PackagePlusIcon className="-ms-1 size-6" aria-hidden="true" />
                                Tambah
                            </Button>
                        </DialogTrigger>

                        <DialogContent
                            showCloseButton={false}
                            onInteractOutside={(e) => {
                                e.preventDefault();
                            }}
                            onEscapeKeyDown={canceledAddForm}
                        >
                            <div className="w-full max-w-md space-y-6 rounded-md bg-white pl-2">
                                <div
                                    aria-hidden="true"
                                    className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full border border-app-primary-950 text-app-primary-950"
                                >
                                    <PackagePlusIcon className="opacity-80" size={24} />
                                </div>
                                <DialogHeader>
                                    <DialogTitle className="text-center text-app-primary-950">Tambah Stok Tabung Gas</DialogTitle>
                                    <DialogDescription className="text-center text-app-primary-900/80">
                                        Isi formulir berikut untuk menambahkan stok tabung gas baru.
                                    </DialogDescription>
                                </DialogHeader>

                                {/* Form Add Stock */}
                                <form className="flex max-h-[520px] w-full flex-col gap-1 overflow-y-auto p-2 pr-4" onSubmit={addNewStock}>
                                    <FormSelect
                                        label="Kondisi Tabung"
                                        name="status"
                                        required
                                        value={addForm.data.status !== undefined ? addForm.data.status.toString() : undefined}
                                        onValueChange={(e) => addForm.setData('status', parseInt(e))}
                                        tabIndex={1}
                                        error={addForm.errors.status}
                                    >
                                        {conditionTypes.map((opt) => (
                                            <SelectItem key={opt.id} value={opt.id.toString()}>
                                                {opt.name}
                                            </SelectItem>
                                        ))}
                                    </FormSelect>

                                    <FormSelect
                                        label="Lokasi Tabung"
                                        name="location_id"
                                        required
                                        value={addForm.data.location_id !== undefined ? addForm.data.location_id.toString() : undefined}
                                        onValueChange={(e) => addForm.setData('location_id', e)}
                                        tabIndex={2}
                                        error={addForm.errors.location_id}
                                    >
                                        {gasLocations.map((opt) => (
                                            <SelectItem key={opt.id} value={opt.id.toString()}>
                                                {opt.name}
                                            </SelectItem>
                                        ))}
                                    </FormSelect>

                                    <FormInput
                                        label="Stok"
                                        tabIndex={3}
                                        required
                                        type="number"
                                        min={1}
                                        name="stock"
                                        value={addForm.data.stock}
                                        onChange={(e) => addForm.setData('stock', e.target.valueAsNumber)}
                                        error={addForm.errors.stock}
                                    />

                                    <FormInputPrice
                                        label="Harga Modal"
                                        tabIndex={4}
                                        required
                                        name="capital_price"
                                        value={addForm.data.capital_price}
                                        onChange={(e) => addForm.setData('capital_price', e !== undefined ? e : 0)}
                                        error={addForm.errors.capital_price}
                                    />

                                    <FormInputPrice
                                        label="Harga Pangkalan"
                                        tabIndex={5}
                                        required
                                        name="base_price"
                                        value={addForm.data.base_price}
                                        onChange={(e) => addForm.setData('base_price', e !== undefined ? e : 0)}
                                        error={addForm.errors.base_price}
                                    />

                                    <FormInputPrice
                                        label="Harga Eceran"
                                        tabIndex={6}
                                        required
                                        name="retail_price"
                                        value={addForm.data.retail_price}
                                        onChange={(e) => addForm.setData('retail_price', e !== undefined ? e : 0)}
                                        error={addForm.errors.retail_price}
                                    />

                                    <div className="grid grid-cols-3 gap-3">
                                        <Button
                                            type="submit"
                                            className="col-span-2 rounded-md bg-app-primary-600 text-white shadow-none transition duration-300 hover:bg-app-primary-700"
                                            disabled={addForm.processing}
                                            size={'full'}
                                        >
                                            Simpan
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="col-span-1 rounded-md border-app-primary-300 text-app-primary-900 shadow-none transition duration-300 hover:border-app-primary-500 hover:bg-app-primary-500 hover:text-white"
                                            onClick={canceledAddForm}
                                            size={'full'}
                                        >
                                            Batal
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Dialog Edit Stock */}
                    <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                        <DialogContent
                            showCloseButton={false}
                            onInteractOutside={(e) => {
                                e.preventDefault();
                            }}
                            onEscapeKeyDown={canceledEditForm}
                        >
                            <div className="w-full max-w-md space-y-6 rounded-md bg-white pl-2">
                                <div
                                    aria-hidden="true"
                                    className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full border border-app-primary-950 text-app-primary-950"
                                >
                                    <PencilIcon className="opacity-80" size={24} />
                                </div>
                                <DialogHeader>
                                    <DialogTitle className="text-center text-app-primary-950">Edit Stok Tabung Gas</DialogTitle>
                                    <DialogDescription className="text-center text-app-primary-900/80">
                                        Perbarui informasi stok tabung gas.
                                    </DialogDescription>
                                </DialogHeader>

                                {/* Form Edit Stock */}
                                <form className="flex max-h-[520px] w-full flex-col gap-1 overflow-y-auto p-2 pr-4" onSubmit={updateStock}>
                                    <FormSelect
                                        label="Kondisi Tabung"
                                        name="status"
                                        required
                                        value={editForm.data.status !== undefined ? editForm.data.status.toString() : undefined}
                                        onValueChange={(e) => editForm.setData('status', parseInt(e))}
                                        tabIndex={1}
                                        error={editForm.errors.status}
                                    >
                                        {conditionTypes.map((opt) => (
                                            <SelectItem key={opt.id} value={opt.id.toString()}>
                                                {opt.name}
                                            </SelectItem>
                                        ))}
                                    </FormSelect>

                                    <FormSelect
                                        label="Lokasi Tabung"
                                        name="location_id"
                                        required
                                        value={editForm.data.location_id !== undefined ? editForm.data.location_id.toString() : undefined}
                                        onValueChange={(e) => editForm.setData('location_id', e)}
                                        tabIndex={2}
                                        error={editForm.errors.location_id}
                                    >
                                        {gasLocations.map((opt) => (
                                            <SelectItem key={opt.id} value={opt.id.toString()}>
                                                {opt.name}
                                            </SelectItem>
                                        ))}
                                    </FormSelect>

                                    <FormInput
                                        label="Stok"
                                        tabIndex={3}
                                        required
                                        type="number"
                                        min={1}
                                        name="stock"
                                        value={editForm.data.stock}
                                        onChange={(e) => editForm.setData('stock', e.target.valueAsNumber)}
                                        error={editForm.errors.stock}
                                    />

                                    <FormInputPrice
                                        label="Harga Modal"
                                        tabIndex={4}
                                        required
                                        name="capital_price"
                                        value={editForm.data.capital_price}
                                        onChange={(e) => editForm.setData('capital_price', e !== undefined ? e : 0)}
                                        error={editForm.errors.capital_price}
                                    />

                                    <FormInputPrice
                                        label="Harga Pangkalan"
                                        tabIndex={5}
                                        required
                                        name="base_price"
                                        value={editForm.data.base_price}
                                        onChange={(e) => editForm.setData('base_price', e !== undefined ? e : 0)}
                                        error={editForm.errors.base_price}
                                    />

                                    <FormInputPrice
                                        label="Harga Eceran"
                                        tabIndex={6}
                                        required
                                        name="retail_price"
                                        value={editForm.data.retail_price}
                                        onChange={(e) => editForm.setData('retail_price', e !== undefined ? e : 0)}
                                        error={editForm.errors.retail_price}
                                    />

                                    <div className="grid grid-cols-3 gap-3">
                                        <Button
                                            type="submit"
                                            className="col-span-2 rounded-md bg-app-primary-600 text-white shadow-none transition duration-300 hover:bg-app-primary-700"
                                            disabled={editForm.processing}
                                            size={'full'}
                                        >
                                            Perbarui
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="col-span-1 rounded-md border-app-primary-300 text-app-primary-900 shadow-none transition duration-300 hover:border-app-primary-500 hover:bg-app-primary-500 hover:text-white"
                                            onClick={canceledEditForm}
                                            size={'full'}
                                        >
                                            Batal
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Revenue Info */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {/* Estimasi Pendapatan */}
                    <div className="rounded-lg border border-blue-300 bg-white p-5 shadow-sm">
                        <div className="mb-3 flex items-center gap-2">
                            <div className="rounded-full bg-blue-100 p-2">
                                <BanknoteIcon className="size-4 text-blue-600" />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-800">Estimasi Pendapatan Tersisa</h3>
                        </div>
                        {/* <p className="mb-3 text-xs text-gray-500">Tabung dengan kondisi ISI</p> */}
                        <div className="space-y-2.5">
                            <div className="flex items-center justify-between rounded-md bg-blue-50 px-3 py-2">
                                <span className="text-xs font-medium text-gray-600">Modal</span>
                                <span className="text-sm font-bold text-blue-700">{formatCurrency(getRevenueEstimates().capital)}</span>
                            </div>
                            <div className="flex items-center justify-between rounded-md bg-blue-50 px-3 py-2">
                                <span className="text-xs font-medium text-gray-600">Pangkalan</span>
                                <span className="text-sm font-bold text-blue-700">{formatCurrency(getRevenueEstimates().base)}</span>
                            </div>
                            <div className="flex items-center justify-between rounded-md bg-blue-50 px-3 py-2">
                                <span className="text-xs font-medium text-gray-600">Eceran</span>
                                <span className="text-sm font-bold text-blue-700">{formatCurrency(getRevenueEstimates().retail)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Pendapatan Saat Ini */}
                    <div className="rounded-lg border border-green-300 bg-white p-5 shadow-sm">
                        <div className="mb-3 flex items-center gap-2">
                            <div className="rounded-full bg-green-100 p-2">
                                <BanknoteArrowDownIcon className="size-4 text-green-600" />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-800">Pendapatan Terealisasi</h3>
                        </div>
                        {/* <p className="mb-3 text-xs text-gray-500">Tabung dengan kondisi KOSONG</p> */}
                        <div className="space-y-2.5">
                            <div className="flex items-center justify-between rounded-md bg-green-50 px-3 py-2">
                                <span className="text-xs font-medium text-gray-600">Modal</span>
                                <span className="text-sm font-bold text-green-700">{formatCurrency(getCurrentRevenue().capital)}</span>
                            </div>
                            <div className="flex items-center justify-between rounded-md bg-green-50 px-3 py-2">
                                <span className="text-xs font-medium text-gray-600">Pangkalan</span>
                                <span className="text-sm font-bold text-green-700">{formatCurrency(getCurrentRevenue().base)}</span>
                            </div>
                            <div className="flex items-center justify-between rounded-md bg-green-50 px-3 py-2">
                                <span className="text-xs font-medium text-gray-600">Eceran</span>
                                <span className="text-sm font-bold text-green-700">{formatCurrency(getCurrentRevenue().retail)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Pendapatan Hilang */}
                    <div className="rounded-lg border border-red-300 bg-white p-5 shadow-sm">
                        <div className="mb-3 flex items-center gap-2">
                            <div className="rounded-full bg-red-100 p-2">
                                <BanknoteXIcon className="size-4 text-red-600" />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-800">Kerugian Potensial</h3>
                        </div>
                        {/* <p className="mb-3 text-xs text-gray-500">Tabung dengan kondisi RUSAK</p> */}
                        <div className="space-y-2.5">
                            <div className="flex items-center justify-between rounded-md bg-red-50 px-3 py-2">
                                <span className="text-xs font-medium text-gray-600">Modal</span>
                                <span className="text-sm font-bold text-red-700">{formatCurrency(getLostRevenue().capital)}</span>
                            </div>
                            <div className="flex items-center justify-between rounded-md bg-red-50 px-3 py-2">
                                <span className="text-xs font-medium text-gray-600">Pangkalan</span>
                                <span className="text-sm font-bold text-red-700">{formatCurrency(getLostRevenue().base)}</span>
                            </div>
                            <div className="flex items-center justify-between rounded-md bg-red-50 px-3 py-2">
                                <span className="text-xs font-medium text-gray-600">Eceran</span>
                                <span className="text-sm font-bold text-red-700">{formatCurrency(getLostRevenue().retail)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Content */}
            <div className="px-6 py-4">
                {selectedInfo === 'location' ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-app-primary-900">
                            <thead className="border-b border-app-primary-300 bg-app-primary-50 text-xs uppercase">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Lokasi
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Isi
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Kosong
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Rusak
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Total Stok
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {getStockByLocation().length > 0 ? (
                                    <>
                                        {getStockByLocation().map((locationStock, index) => {
                                            const location = gasLocations.find((loc) => loc.id === locationStock.locationId);
                                            return (
                                                <tr
                                                    key={locationStock.locationId}
                                                    className="border-b border-app-primary-200 hover:bg-app-primary-50"
                                                >
                                                    <td className="px-6 py-4">{index + 1}</td>
                                                    <td className="px-6 py-4 font-medium">{location?.name || '-'}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                                            {locationStock.filled}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                                                            {locationStock.empty}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
                                                            {locationStock.damaged}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                                                            {locationStock.total}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {/* Total Row */}
                                        <tr className="border-t-2 border-app-primary-300 bg-app-primary-50 font-semibold">
                                            <td className="px-6 py-2" colSpan={2}>
                                                Total
                                            </td>
                                            <td className="px-6 py-2">
                                                <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-bold text-green-900">
                                                    {getStockByLocation().reduce((sum, stock) => sum + stock.filled, 0)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-2">
                                                <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-bold text-gray-900">
                                                    {getStockByLocation().reduce((sum, stock) => sum + stock.empty, 0)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-2">
                                                <span className="rounded-full bg-red-200 px-3 py-1 text-xs font-bold text-red-900">
                                                    {getStockByLocation().reduce((sum, stock) => sum + stock.damaged, 0)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-2">
                                                <span className="rounded-full bg-blue-200 px-3 py-1 text-xs font-bold text-blue-900">
                                                    {getStockByLocation().reduce((sum, stock) => sum + stock.total, 0)}
                                                </span>
                                            </td>
                                        </tr>
                                    </>
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-app-primary-500">
                                            Belum ada data stok yang tersedia.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-app-primary-900">
                            <thead className="border-b border-app-primary-300 bg-app-primary-50 text-xs uppercase">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Lokasi
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Kondisi
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Stok
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Harga Modal
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Harga Pangkalan
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Harga Eceran
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {histories.length > 0 ? (
                                    histories.map((history, index) => {
                                        const location = gasLocations.find((loc) => loc.id === history.location_id);
                                        const condition = conditionTypes.find((cond) => cond.id === history.status);
                                        return (
                                            <tr key={history.id} className="border-b border-app-primary-200 hover:bg-app-primary-50">
                                                <td className="px-6 py-4">{index + 1}</td>
                                                <td className="px-6 py-4">{location?.name || '-'}</td>
                                                <td className="px-6 py-4">{condition?.name || '-'}</td>
                                                <td className="px-6 py-4">{history.stock}</td>
                                                <td className="px-6 py-4">
                                                    {new Intl.NumberFormat('id-ID', {
                                                        style: 'currency',
                                                        currency: 'IDR',
                                                        minimumFractionDigits: 0,
                                                    }).format(history.capital_price)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {new Intl.NumberFormat('id-ID', {
                                                        style: 'currency',
                                                        currency: 'IDR',
                                                        minimumFractionDigits: 0,
                                                    }).format(history.base_price)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {new Intl.NumberFormat('id-ID', {
                                                        style: 'currency',
                                                        currency: 'IDR',
                                                        minimumFractionDigits: 0,
                                                    }).format(history.retail_price)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center gap-x-1">
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            variant="outline"
                                                            className="border-amber-700 bg-transparent px-1 text-amber-700 hover:border-amber-500 hover:bg-amber-50 has-[>svg]:px-1.5"
                                                            onClick={() => handleEdit(history)}
                                                        >
                                                            <PencilIcon className="size-4" />
                                                        </Button>
                                                        <DeleteButton
                                                            url={route('gas_cylinder.stock.delete', { history_id: history.id })}
                                                            pageName="Stok Tabung Gas"
                                                            onlyProps={['gasCylinder']}
                                                            title="Hapus Stok Tabung Gas"
                                                            description={`Apakah Anda yakin ingin menghapus catatan stok ini?`}
                                                            selectedData={
                                                                condition ? `${condition.name} pada lokasi ${location?.name || 'Lokasi'}` : 'Kondisi'
                                                            }
                                                            popSide="left"
                                                            className="border border-red-700 bg-transparent p-1 py-1.5 text-red-700"
                                                            variant="rect"
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-8 text-center text-app-primary-500">
                                            Belum ada data harga yang tersedia.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
