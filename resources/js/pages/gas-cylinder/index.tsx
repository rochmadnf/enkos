import { MainContent } from '@/components/main-content';
import { CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { ReactNode } from 'react';

export default function GasCylinderIndex() {
    return (
        <>
            <Head title="Tabung Gas">
                <meta name="description" content="Daftar Tabung Gas" />
            </Head>
            <MainContent
                contentName="Daftar Tabung"
                contentDesc="Menampilkan tabung yang sudah tersimpan di sistem."
                buttonIcon={<Plus />}
                buttonLabel="Tambah Data"
                url={route('gas_cylinder.create')}
            >
                <CardContent>ABCDe</CardContent>
            </MainContent>
        </>
    );
}

GasCylinderIndex.layout = (page: ReactNode) => <AppLayout children={page} />;
