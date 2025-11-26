import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CoinsIcon, MapPinHouseIcon, PackagePlusIcon } from 'lucide-react';
import { useState } from 'react';

export function DataTable() {
    const [selectedInfo, setSelectedInfo] = useState<'location' | 'price'>('location');

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
                <Button
                    className="h-12 rounded-md border-app-primary-300 text-app-primary-900 shadow-none transition duration-300 hover:border-app-primary-500 hover:bg-app-primary-500 hover:text-white"
                    variant="outline"
                >
                    <PackagePlusIcon className="-ms-1 size-6" aria-hidden="true" />
                    Tambah
                </Button>
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
