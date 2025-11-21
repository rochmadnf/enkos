import { ActionMenu } from '@/components/action-menu';
import { DeleteButton } from '@/components/form/delete-button';
import { PageHeader } from '@/components/page-header';
import { Pagination } from '@/components/table/pagination';
import { TableEmptyState, TableLoadingState } from '@/components/table/table-states';
import { usePagination } from '@/hooks/use-pagination';
import AppLayout from '@/layouts/app-layout';
import { ThousandSeparatorID } from '@/lib/utils';
import { PageDataProps } from '@/types';
import { PaginationMetaProps } from '@/types/pagination';
import { Head, usePage } from '@inertiajs/react';
import { FileSymlinkIcon, FunnelPlusIcon } from 'lucide-react';
import { CSSProperties, ReactNode } from 'react';
import { ButtonAdd } from './partials/_btn-add';
import { ButtonEdit } from './partials/_btn-edit';

export type GasCylinderProps = {
    id: string;
    name: string;
    total_stock: number;
    create: string;
};

const PER_PAGE_LIST = [5, 10, 25, 50, 100];

export default function GasCylinderIndex() {
    const { page, gasCylinders: { data: rows, meta } = { data: [], meta: undefined } } = usePage<
        PageDataProps & { gasCylinders: { data: GasCylinderProps[]; meta: PaginationMetaProps } | undefined }
    >().props;

    const { pageState, perPageState, setCurrentPage, setShowDataPerpage, isLoading } = usePagination(meta, {
        routeName: 'gas_cylinder.index',
        onlyProps: ['gasCylinders'],
        defaultPerPage: 5,
    });

    const actionMenuItems = [
        {
            icon: FunnelPlusIcon,
            label: 'Filter',
            onClick: () => console.log('Filter clicked'),
        },
        {
            icon: FileSymlinkIcon,
            label: 'Ekspor',
            onClick: () => console.log('Export clicked'),
        },
    ];

    return (
        <>
            <Head title="Tabung Gas">
                <meta name="description" content="Daftar Tabung Gas" />
            </Head>

            <div className="space-y-6 p-6">
                {/* header */}
                <PageHeader />

                {/* content */}
                <section className="rounded-lg border border-app-primary-300">
                    {/* action toolbar */}
                    <div className="flex w-full flex-row items-center justify-end border-b border-b-app-primary-300 p-4">
                        <div className="inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
                            <ButtonAdd />
                            <ActionMenu items={actionMenuItems} />
                        </div>
                    </div>

                    {/* list of data */}
                    <div className="px-4 py-6">
                        <div className="overflow-hidden rounded-md border border-app-primary-300">
                            <table className="w-full">
                                <thead className="bg-app-primary-500 text-app-primary-50">
                                    <tr>
                                        <th rowSpan={2} className="border-r border-app-primary-300 py-2 last:border-r-0">
                                            Nama Tabung
                                        </th>
                                        <th colSpan={6} className="border-r border-b border-app-primary-300 py-2 text-center last:border-r-0">
                                            Stok
                                        </th>
                                        <th rowSpan={2} className="w-15 border-r border-b border-app-primary-300 py-2 last:border-r-0">
                                            Aksi
                                        </th>
                                    </tr>
                                    <tr
                                        className="border-b border-app-primary-300"
                                        style={
                                            {
                                                '--th-width': '80px',
                                            } as CSSProperties
                                        }
                                    >
                                        <th className="w-(--th-width) border-r border-app-primary-300 py-2">Isi</th>
                                        <th className="w-(--th-width) border-r border-app-primary-300 py-2">Kosong</th>
                                        <th className="w-(--th-width) border-r border-app-primary-300 py-2">Bocor</th>
                                        <th className="w-(--th-width) border-r border-app-primary-300 py-2">Pinjam</th>
                                        <th className="w-(--th-width) border-r border-app-primary-300 py-2">Dipinjam</th>
                                        <th className="w-(--th-width) border-r border-app-primary-300 py-2">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        <TableLoadingState colSpan={8} />
                                    ) : rows.length === 0 ? (
                                        <TableEmptyState colSpan={8} />
                                    ) : (
                                        rows.map((row) => (
                                            <tr key={row.id} className="border-b border-app-primary-300 last:border-b-0">
                                                <td className="border-r border-e-app-primary-300 p-2.5 last:border-r-0">{row.name}</td>
                                                <td className="border-r border-e-app-primary-300 p-2.5 text-center last:border-r-0">0</td>
                                                <td className="border-r border-e-app-primary-300 p-2.5 text-center last:border-r-0">0</td>
                                                <td className="border-r border-e-app-primary-300 p-2.5 text-center last:border-r-0">0</td>
                                                <td className="border-r border-e-app-primary-300 p-2.5 text-center last:border-r-0">0</td>
                                                <td className="border-r border-e-app-primary-300 p-2.5 text-center last:border-r-0">0</td>
                                                <td className="border-r border-e-app-primary-300 p-2.5 text-right font-bold last:border-r-0">
                                                    {ThousandSeparatorID(row.total_stock)}
                                                </td>
                                                <td className="border-r border-e-app-primary-300 p-2.5 last:border-r-0">
                                                    <div className="group flex-center flex w-full flex-row gap-x-2">
                                                        <ButtonEdit data={row} pageState={pageState} perPageState={perPageState} />
                                                        <DeleteButton
                                                            url={route('gas_cylinder.delete', {
                                                                gas_id: row.id,
                                                                page: [meta?.from, meta?.to].every((num) => num === meta?.from)
                                                                    ? pageState > 1
                                                                        ? pageState - 1
                                                                        : 1
                                                                    : pageState,
                                                                per_page: perPageState,
                                                            })}
                                                            onlyProps={['gasCylinders']}
                                                            selectedData={row.name}
                                                            title="Hapus Tabung Gas"
                                                            description={`Kamu akan menghapus tabung gas <strong className="font-bold! text-slate-950!">${row.name}</strong>.`}
                                                            pageName="Tabung Gas"
                                                            variant="pill"
                                                            className="border-app-primary-300 text-destructive"
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* pagination */}
                    <Pagination
                        meta={meta}
                        pageState={pageState}
                        perPageState={perPageState}
                        perPageList={PER_PAGE_LIST}
                        onPageChange={setCurrentPage}
                        onPerPageChange={setShowDataPerpage}
                    />
                </section>
            </div>
        </>
    );
}

GasCylinderIndex.layout = (page: ReactNode) => <AppLayout children={page} />;
