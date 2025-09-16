import { MyIcon } from '@/components/icon-lucide';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { cn, formatNumberShort } from '@/lib/utils';
import { Head, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
import { GasLocationDataProps } from './types';

export default function GasLocationShow() {
    const { detail: { data: gasLocation } = { data: undefined } } = usePage<{
        detail?: { data: GasLocationDataProps };
    }>().props;

    console.log(gasLocation);

    return (
        <>
            <Head title="Detail Lokasi"></Head>
            <Card className={cn('h-full min-h-0 flex-1 rounded-2xl border-app-primary-300/70 bg-app-primary-100/50 px-6 shadow-none')}>
                <div className="flex w-full flex-row items-center justify-between rounded-lg border border-app-primary-300 bg-white p-6">
                    <div className="flex flex-row gap-x-6">
                        <div
                            className="flex size-32 items-center justify-center rounded-md ring-2 ring-offset-4"
                            style={{
                                backgroundColor: gasLocation ? gasLocation.color.bg : '#FFFFFF',
                                color: gasLocation ? gasLocation.color.text : '#EF4444',
                            }}
                        >
                            <MyIcon name={gasLocation ? gasLocation.type.icon : 'CircleDot'} className="size-16 stroke-1" />
                        </div>
                        <div className="">
                            <h1 className="text-3xl/8 font-bold tracking-wide uppercase">{gasLocation?.name}</h1>
                            <p className="text-lg text-gray-600">{gasLocation?.pic}</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-x-6">
                        <div className="flex flex-col items-center gap-y-2">
                            <div className="flex size-26 items-center justify-center rounded-full border bg-emerald-400 p-2 text-3xl font-bold text-white ring-2 ring-emerald-400 ring-offset-2">
                                {formatNumberShort(100)}
                            </div>
                            <h3 className="font-bold tracking-wide text-slate-900 uppercase">ISI</h3>
                        </div>
                        <div className="flex flex-col items-center gap-y-2">
                            <div className="flex size-26 items-center justify-center rounded-full border bg-gray-600 p-2 text-3xl font-bold text-white ring-2 ring-gray-600 ring-offset-2">
                                {formatNumberShort(50)}
                            </div>
                            <h3 className="font-bold tracking-wide text-slate-900 uppercase">Kosong</h3>
                        </div>
                        <div className="flex flex-col items-center gap-y-2">
                            <div className="flex size-26 items-center justify-center rounded-full border bg-red-400 p-2 text-3xl font-bold text-white ring-2 ring-red-400 ring-offset-2">
                                {formatNumberShort(3)}
                            </div>
                            <h3 className="font-bold tracking-wide text-slate-900 uppercase">Bocor</h3>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    );
}

GasLocationShow.layout = (page: ReactNode) => <AppLayout children={page} />;
