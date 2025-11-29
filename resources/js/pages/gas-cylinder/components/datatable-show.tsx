import { FormInput } from '@/components/form/input';
import { FormInputPrice } from '@/components/form/input-price';
import { FormSelect } from '@/components/form/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { CoinsIcon, MapPinHouseIcon, PackagePlusIcon } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';
import { DataTableShowProps, FormValues } from '../types';

export function DataTableShow({ selectedGasCylinder, gasLocations, conditionTypes }: DataTableShowProps) {
    const [selectedInfo, setSelectedInfo] = useState<'location' | 'price'>('location');
    const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);

    const addForm = useForm<FormValues>({
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

    return (
        <div className="rounded-md border border-app-primary-300 py-4">
            {/* Header */}
            <div className="flex w-full items-center justify-between border-b border-app-primary-300 px-6 pb-4">
                {/* Select Information Detail */}
                <Select defaultValue={selectedInfo} onValueChange={(value) => setSelectedInfo(value as 'location' | 'price')}>
                    <SelectTrigger className="cursor-pointer border-app-primary-300 px-4 text-left hover:bg-app-primary-50 focus-visible:border-app-primary-500 focus-visible:ring-app-primary-300/50 data-[size=default]:h-14 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0 [&>svg]:hidden">
                        <SelectValue placeholder="Pilih Informasi" />
                    </SelectTrigger>
                    <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                        <SelectItem value="location">
                            <span className="flex items-center gap-2">
                                <MapPinHouseIcon className="pointer-events-none size-7 text-app-primary-950" />
                                <span>
                                    <span className="block font-medium text-app-primary-950">Lokasi</span>
                                    <span className="mt-0.5 block text-xs text-app-primary-900/70">Daftar Lokasi Stock</span>
                                </span>
                            </span>
                        </SelectItem>
                        <SelectItem value="price">
                            <span className="flex items-center gap-2">
                                <CoinsIcon className="pointer-events-none size-7 text-app-primary-950" />
                                <span>
                                    <span className="block font-medium text-app-primary-950">Harga</span>
                                    <span className="mt-0.5 block text-xs text-app-primary-900/70">Daftar Harga Stock</span>
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
            </div>

            {/* Table Content */}
            <div className="px-6 py-4">
                {selectedInfo === 'location' ? (
                    <div className="text-app-primary-900">Menampilkan data lokasi stok tabung gas.</div>
                ) : (
                    <div className="text-app-primary-900">Menampilkan data harga stok tabung gas.</div>
                )}
            </div>
        </div>
    );
}
