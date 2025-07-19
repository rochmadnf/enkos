import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard"></Head>
            <p>Ini Content nya</p>
        </>
    );
}

Dashboard.layout = (page: ReactNode) => <AppLayout children={page} />;
