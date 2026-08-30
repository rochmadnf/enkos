import { DataTable } from '@/components/datatable';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/base/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/utils';
import { PageDataProps } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { LibrarySquareIcon, MoreVerticalIcon, PlusIcon } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { columns } from './components/columns';
import { FormModal } from './components/form-modal';
import { CashFlowDataProps, CashFlowsIndexProps } from './types';

const MONTHS = [
    { value: 0, label: 'Semua' },
    {
        value: 1,
        label: 'Januari',
    },
    {
        value: 2,
        label: 'Februari',
    },
    {
        value: 3,
        label: 'Maret',
    },
    {
        value: 4,
        label: 'April',
    },
    {
        value: 5,
        label: 'Mei',
    },
    {
        value: 6,
        label: 'Juni',
    },
    {
        value: 7,
        label: 'Juli',
    },
    {
        value: 8,
        label: 'Agustus',
    },
    {
        value: 9,
        label: 'September',
    },
    {
        value: 10,
        label: 'Oktober',
    },
    {
        value: 11,
        label: 'November',
    },
    {
        value: 12,
        label: 'Desember',
    },
];

export default function CashFlowsIndex() {
    const { page, resources, balance } = usePage<PageDataProps & CashFlowsIndexProps>().props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formFilter = useForm({
        month: 0,
    });

    const handleEdit = () => {
        console.log('Edit user');
    };

    const handleAdd = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <Head title="Arus Kas">
                <meta name="description" content="Daftar Arus Kas" />
            </Head>
            <div className="space-y-6 p-6">
                {/* header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1 text-app-primary-950">
                        <h1 className="text-2xl font-semibold tracking-wide uppercase sm:text-3xl">{page.name}</h1>
                        <p className="text-sm font-light tracking-wider sm:text-base">{page.description}</p>
                    </div>

                    <div className="flex items-center">
                        <Button onClick={handleAdd} className="gap-2 rounded-r-none">
                            <PlusIcon />
                            Arus Kas
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <Button className="rounded-l-none">
                                        <MoreVerticalIcon />
                                    </Button>
                                }
                            />
                            <DropdownMenuContent sideOffset={10} className={`w-fit`}>
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>Menu Lainnya</DropdownMenuLabel>
                                    <DropdownMenuItem className="cursor-pointer" onClick={() => router.visit(route('cash-flows.categories.index'))}>
                                        <LibrarySquareIcon />
                                        Tambah Kategori Kas
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* info card */}
                <div className="grid gap-4 sm:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Saldo</CardTitle>
                        </CardHeader>
                        <div className="px-6">
                            <p className="text-2xl font-bold">{formatRupiah(balance.net)}</p>
                        </div>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Kredit</CardTitle>
                        </CardHeader>
                        <div className="px-6">
                            <p className="text-2xl font-bold text-green-600">{formatRupiah(balance.income)}</p>
                        </div>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Debit</CardTitle>
                        </CardHeader>
                        <div className="px-6">
                            <p className="text-2xl font-bold text-red-600">{formatRupiah(balance.expense)}</p>
                        </div>
                    </Card>
                </div>

                <div className="flex w-full items-center gap-x-4">
                    <div className="flex items-center rounded-md border border-red-300 px-4 py-2">
                        <span className="text-sm">Bulan:</span>
                        <Select value={formFilter.data.month.toString()} onValueChange={(value) => formFilter.setData('month', parseInt(value))}>
                            <SelectTrigger id="filter-month" className="border-0">
                                <SelectValue placeholder="Pilih Bulan" />
                            </SelectTrigger>
                            <SelectContent>
                                {MONTHS.map((month) => (
                                    <SelectItem key={month.value} value={month.value.toString()}>
                                        {month.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* datatable */}
                <DataTable<CashFlowDataProps>
                    data={resources.data}
                    metadata={resources.meta}
                    columns={columns({ metadata: resources.meta, onEdit: handleEdit })}
                    routeName="cash-flows.index"
                    searchable
                />
            </div>

            {/* Form Modal */}
            <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedItem={undefined} />
        </>
    );
}

CashFlowsIndex.layout = (page: ReactNode) => <AppLayout children={page} />;
