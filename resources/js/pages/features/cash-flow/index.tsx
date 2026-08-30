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
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/utils';
import { PageDataProps } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { LibrarySquareIcon, MoreVerticalIcon, PlusIcon } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { CashFlowFormModal } from './components/cash-flow-form-modal';
import { columns } from './components/columns';
import { CashFlowDataProps, CashFlowsIndexProps } from './types';

export default function CashFlowsIndex() {
    const { page, resources, balance } = usePage<PageDataProps & CashFlowsIndexProps>().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);

    const handleEdit = () => {
        console.log('Edit user');
    };

    const handleAdd = () => {
        setIsModalOpen(true);
    };

    const handleRefresh = () => {
        window.location.reload();
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
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Credit</CardTitle>
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
            <CashFlowFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleRefresh} />
        </>
    );
}

CashFlowsIndex.layout = (page: ReactNode) => <AppLayout children={page} />;
