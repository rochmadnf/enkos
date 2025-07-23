import { MainContent } from '@/components/main-content';
import { CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { ReactNode } from 'react';

export default function GasCylinderAdd() {
    return (
        <>
            <Head title="Tabung Gas">
                <meta name="description" content="Tambah Tabung" />
            </Head>
            <MainContent
                contentName="Tambah Tabung"
                contentDesc="Form penambahan tabung gas."
                buttonVariant={'netral'}
                buttonIcon={<ArrowLeft />}
                buttonLabel="Kembali"
                url={route('gas_cylinder.index')}
            >
                <CardContent>ABCD</CardContent>
            </MainContent>
        </>
    );
}

GasCylinderAdd.layout = (page: ReactNode) => <AppLayout children={page} />;
