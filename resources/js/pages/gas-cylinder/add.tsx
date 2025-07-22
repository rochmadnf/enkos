import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { ReactNode } from 'react';

export default function GasCylinderAdd() {
    return (
        <>
            <Head title="Tabung Gas">
                <meta name="description" content="Daftar Tabung Gas" />
            </Head>
            <Card className="min-h-full flex-1 rounded-2xl border-app-primary-300 px-6 shadow-app-primary-600/30">
                <div className="flex flex-row items-center justify-between" data-slot="card-header">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-semibold tracking-wide">Daftar Tabung</h1>
                        <p className="font-light tracking-wider text-slate-900">Menampilkan tabung yang sudah tersimpan di sistem.</p>
                    </div>
                    <Button size={'icon'} asChild className="group/button size-11 rounded-full">
                        <Link href={'#'}>
                            <PlusIcon className="size-6" />
                        </Link>
                    </Button>
                </div>
                <CardContent>
                    <p>content</p>
                </CardContent>
            </Card>
        </>
    );
}

GasCylinderAdd.layout = (page: ReactNode) => <AppLayout children={page} />;
