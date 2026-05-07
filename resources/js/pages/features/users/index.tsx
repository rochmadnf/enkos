import { DataTable } from '@/components/datatable';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { PageDataProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { columns } from './components/columns';
import { UsersDataProps, UsersIndexProps } from './types';

export default function UsersPageIndex() {
    const { page, resources } = usePage<PageDataProps & UsersIndexProps>().props;

    const handleEdit = () => {
        console.log('Edit user');
    };

    const handleAdd = () => {
        console.log('Add user');
    };

    return (
        <>
            <Head title="Pengguna">
                <meta name="description" content="Daftar Pengguna" />
            </Head>
            <div className="space-y-6 p-6">
                {/* header */}
                <div className="space-y-1 text-app-primary-950">
                    <h1 className="text-2xl font-semibold tracking-wide uppercase sm:text-3xl">{page.name}</h1>
                    <p className="text-sm font-light tracking-wider sm:text-base">{page.description}</p>
                </div>

                <DataTable<UsersDataProps>
                    data={resources.data}
                    metadata={resources.meta}
                    columns={columns({ metadata: resources.meta, onEdit: handleEdit })}
                    routeName="console.master-data.offices.index"
                    searchable
                    toolbarRight={
                        <Button variant="default" className="cursor-pointer" onClick={handleAdd}>
                            <PlusIcon />
                            Akun
                        </Button>
                    }
                />
            </div>
        </>
    );
}

UsersPageIndex.layout = (page: ReactNode) => <AppLayout children={page} />;
