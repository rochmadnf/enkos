import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { UserRoundIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { GasLocationDataProps } from './types';

export default function GasLocationShow() {
    const { detail: { data: gasLocation } = { data: undefined } } = usePage<{
        detail?: { data: GasLocationDataProps };
    }>().props;

    return (
        <>
            <Head title={`Lokasi: ${gasLocation?.name}`}></Head>
            <main className="px-6 pt-6">
                <div className="space-y-1 text-app-primary-950">
                    <h1 className="text-2xl font-semibold tracking-wide uppercase sm:text-3xl">
                        Lokasi: {gasLocation?.name !== undefined ? gasLocation.name : 'Nama Lokasi'}
                    </h1>
                    <span className="flex items-center text-sm tracking-wider sm:text-base">
                        <UserRoundIcon className="mr-2 size-6" />
                        {gasLocation?.pic !== undefined ? gasLocation.pic : 'Penanggung Jawab'}
                    </span>
                </div>
            </main>
        </>
    );
}

GasLocationShow.layout = (page: ReactNode) => <AppLayout children={page} />;
