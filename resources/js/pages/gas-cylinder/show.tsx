import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { DataTableShow } from './components/datatable-show';
import { StockCard } from './components/stock-card';
import { UsePageProps } from './types';

export default function GasCylinderShow() {
    const {
        gasCylinder: { data: detail } = { data: undefined },
        gasLocations: { data: gLocs } = { data: [] },
        conditionTypes,
    } = usePage<UsePageProps>().props;

    return (
        <>
            <Head title={`Detail: ${detail?.name || 'Tabung Gas'}`}>
                <meta name="description" content={`Detail informasi mengenai ${detail?.name || 'Nama Tabung Gas'}`} />
            </Head>

            <div className="w-full space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1 text-app-primary-950">
                        <h1 className="text-2xl font-semibold tracking-wide uppercase select-none sm:text-3xl">
                            Detail: {detail?.name || 'Nama Tabung Gas'}
                        </h1>
                        <p className="text-sm font-light tracking-wider sm:text-base">Detail informasi dan distribusi stok tabung gas</p>
                    </div>

                    <Button asChild variant="outline" className="border-app-primary-300 text-app-primary-900 hover:bg-app-primary-50">
                        <Link href={route('gas_cylinder.index')}>
                            <ArrowLeftIcon className="mr-2 size-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                {/* Info Stok */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StockCard label="Total Stok" stock={detail?.total_stock || 0} desc="Jumlah total stok tabung gas." />
                    <StockCard label="Isi" stock={detail?.stock.filled || 0} desc="Tabung berisi gas." variant={'fill'} />
                    <StockCard label="Kosong" stock={detail?.stock.empty || 0} desc="Tabung kosong." variant={'none'} />
                    <StockCard label="Bocor/Rusak" stock={detail?.stock.damaged || 0} desc="Tabung rusak." variant={'broken'} />
                </div>

                {/* Datatable */}
                <DataTableShow
                    selectedGasCylinder={detail?.id}
                    gasLocations={gLocs}
                    conditionTypes={conditionTypes}
                    histories={detail?.histories || []}
                />
            </div>
        </>
    );
}

GasCylinderShow.layout = (page: ReactNode) => <AppLayout children={page} />;
