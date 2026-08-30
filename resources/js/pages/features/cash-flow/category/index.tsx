import { DataTable } from '@/components/datatable';
import { Button } from '@/components/ui/base/button';
import AppLayout from '@/layouts/app-layout';
import { PageDataProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeftIcon, PlusIcon } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { columns } from './components/columns';
import { FormModal } from './components/form';
import { CashFlowCategoryDataProps, CashFlowsCategoryIndexProps } from './types';

export default function CashFlowCategoryIndex() {
    const { page, resources } = usePage<PageDataProps & CashFlowsCategoryIndexProps>().props;
    const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<CashFlowCategoryDataProps | undefined>(undefined);

    const handleEdit = (category: CashFlowCategoryDataProps) => {
        setSelectedCategory(category);
        setIsFormModalOpen(true);
    };

    const handleAddData = () => {
        setSelectedCategory(undefined);
        setIsFormModalOpen(true);
    };

    return (
        <>
            <Head title="Kategori Arus Kas">
                <meta name="description" content="Daftar Kategori Arus Kas" />
            </Head>
            <div className="space-y-6 p-6">
                {/* header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1 text-app-primary-950">
                        <h1 className="text-2xl font-semibold tracking-wide uppercase sm:text-3xl">{page.name}</h1>
                        <p className="text-sm font-light tracking-wider sm:text-base">{page.description}</p>
                    </div>
                    <div className="flex items-center">
                        <Button onClick={handleAddData} className="cursor-pointer gap-2">
                            <PlusIcon />
                            Kategori Kas
                        </Button>
                    </div>
                </div>
                <Button
                    nativeButton={false}
                    size={'lg'}
                    variant={'ghost'}
                    render={
                        <Link href={route('cash-flows.index')} className="gap-2">
                            <ArrowLeftIcon /> Kembali
                        </Link>
                    }
                />

                <DataTable<CashFlowCategoryDataProps>
                    data={resources.data}
                    metadata={resources.meta}
                    columns={columns({ metadata: resources.meta, onEdit: handleEdit })}
                    routeName="cash-flows.categories.index"
                    searchable
                />
            </div>

            <FormModal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} selectedCategory={selectedCategory} />
        </>
    );
}

CashFlowCategoryIndex.layout = (page: ReactNode) => <AppLayout children={page} />;
