import { DataTable } from '@/components/datatable';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/utils';
import { PageDataProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
import { columns } from './components/columns';
import { CashFlowDataProps, CashFlowsIndexProps } from './types';

export default function CashFlowsIndex() {
    const { page, resources } = usePage<PageDataProps & CashFlowsIndexProps>().props;

    const handleEdit = () => {
        console.log('Edit user');
    };

    const handleAdd = () => {
        console.log('Add user');
    };

    // Calculate totals
    const totalDebit = resources.data.reduce((sum, item) => {
        return item.type === 'debit' ? sum + item.amount : sum;
    }, 0);

    const totalCredit = resources.data.reduce((sum, item) => {
        return item.type === 'credit' ? sum + item.amount : sum;
    }, 0);

    const totalSaldo = totalCredit - totalDebit;

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

                {/* info card */}
                <div className="grid gap-4 sm:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Saldo</CardTitle>
                        </CardHeader>
                        <div className="px-6">
                            <p className="text-2xl font-bold">{formatRupiah(totalSaldo)}</p>
                        </div>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Credit</CardTitle>
                        </CardHeader>
                        <div className="px-6">
                            <p className="text-2xl font-bold text-green-600">{formatRupiah(totalCredit)}</p>
                        </div>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Debit</CardTitle>
                        </CardHeader>
                        <div className="px-6">
                            <p className="text-2xl font-bold text-red-600">{formatRupiah(totalDebit)}</p>
                        </div>
                    </Card>
                </div>

                {/* datatable */}
                <DataTable<CashFlowDataProps>
                    data={resources.data}
                    metadata={resources.meta}
                    columns={columns({ metadata: resources.meta, onEdit: handleEdit })}
                    routeName="cash_flows.index"
                    searchable
                />
            </div>
        </>
    );
}

CashFlowsIndex.layout = (page: ReactNode) => <AppLayout children={page} />;
