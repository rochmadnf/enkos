import { MainContent } from '@/components/main-content';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { DataTable } from './components/datatable';

export default function GasLocationIndex() {
    return (
        <>
            <Head title="Lokasi Tabung">
                <meta name="description" content="Daftar lokasi tabung gas." />
            </Head>
            <MainContent className="gap-0" buttonIcon={<PlusIcon />} buttonLabel="Tambah Data" url={route('gas_location.create')}>
                <DataTable />
            </MainContent>
        </>
    );
}

GasLocationIndex.layout = (page: ReactNode) => <AppLayout children={page} />;
