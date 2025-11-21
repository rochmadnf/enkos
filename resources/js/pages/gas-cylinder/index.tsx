import { LoadingState } from '@/components/custom/loading-state';
import { DeleteButton } from '@/components/form/delete-button';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { ThousandSeparatorID } from '@/lib/utils';
import { PageDataProps } from '@/types';
import { PaginationMetaProps } from '@/types/pagination';
import { Head, usePage } from '@inertiajs/react';
import {
    ChevronFirstIcon,
    ChevronLastIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    DatabaseIcon,
    EllipsisIcon,
    EyeIcon,
    FileSymlinkIcon,
    FunnelPlusIcon,
} from 'lucide-react';
import { CSSProperties, ReactNode } from 'react';
import { PER_PAGE_LIST, usePaginationState } from './lib/pagination';
import { ButtonAdd } from './partials/_btn-add';
import { ButtonEdit } from './partials/_btn-edit';

export type GasCylinderProps = {
    id: string;
    name: string;
    total_stock: number;
    create: string;
};

export default function GasCylinderIndex() {
    const { page, gasCylinders: { data: rows, meta } = { data: [], meta: undefined } } = usePage<
        PageDataProps & { gasCylinders: { data: GasCylinderProps[]; meta: PaginationMetaProps } | undefined }
    >().props;

    const { pageState, perPageState, setPageState, setShowDataPerpage, setCurrentPage, isLoading } = usePaginationState(meta);

    return (
        <>
            <Head title="Tabung Gas">
                <meta name="description" content="Daftar Tabung Gas" />
            </Head>
            <div className="space-y-6 p-6">
                {/* header */}
                <div className="space-y-1 text-app-primary-950">
                    <h1 className="text-2xl font-semibold tracking-wide uppercase sm:text-3xl">{page.name}</h1>
                    <p className="text-sm font-light tracking-wider sm:text-base">{page.description}</p>
                </div>

                {/* content */}
                <section className="rounded-lg border border-app-primary-300">
                    {/* search and add button + ... */}
                    <div className="flex w-full flex-row items-center justify-end border-b border-b-app-primary-300 p-4">
                        {/* <div className="relative">
                            <Input
                                id="searchInput"
                                className="peer border border-app-primary-300 ps-9.5 pe-9 text-app-primary-900 placeholder:text-app-primary-400/80 focus-within:text-app-primary-900 focus:text-app-primary-900 focus-visible:border-app-primary-500 focus-visible:text-app-primary-900 focus-visible:ring-app-primary-300/50"
                                placeholder="Cari: minimal 3 huruf..."
                                type="search"
                            />
                            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-app-primary-400/80 peer-not-placeholder-shown:text-app-primary-900 peer-placeholder-shown:text-app-primary-400/80 peer-disabled:opacity-50">
                                <SearchIcon className="size-5" />
                            </div>
                        </div> */}

                        <div className="inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
                            <ButtonAdd />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        className="rounded-none border-app-primary-300 text-app-primary-900 shadow-none first:rounded-s-md last:rounded-e-md hover:border-app-primary-500 hover:bg-app-primary-500 hover:text-white focus-visible:z-10 focus-visible:border-app-primary-500 focus-visible:ring-app-primary-300/50"
                                        variant="outline"
                                        size="icon"
                                        aria-label="Menu"
                                    >
                                        <EllipsisIcon size={16} aria-hidden="true" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel className="text-xs text-app-primary-950 select-none">Lainnya</DropdownMenuLabel>
                                    <DropdownMenuItem className="group w-full cursor-pointer text-app-primary-950 focus:bg-app-primary-100/90 focus:text-app-primary-600">
                                        <FunnelPlusIcon className="text-app-primary-950 group-hover:text-app-primary-600" />
                                        Filter
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="group w-full cursor-pointer text-app-primary-950 focus:bg-app-primary-100/90 focus:text-app-primary-600">
                                        <FileSymlinkIcon className="text-app-primary-950 group-hover:text-app-primary-600" />
                                        Ekspor
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
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
                                        <tr>
                                            <td colSpan={8} className="py-12">
                                                <div className="flex flex-col items-center justify-center gap-y-4 text-slate-900/70">
                                                    <LoadingState className="size-20 fill-app-primary-500" />
                                                    <span className="font-light text-app-primary-950">Memuat data...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : rows.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="py-12">
                                                <div className="flex flex-col items-center justify-center gap-y-4 text-slate-900/70">
                                                    <DatabaseIcon className="size-20 text-app-primary-950" />
                                                    <span className="font-light text-app-primary-950">Belum ada data yang tersedia.</span>
                                                </div>
                                            </td>
                                        </tr>
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
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button
                                                                        asChild
                                                                        size="icon"
                                                                        variant="outline"
                                                                        className="size-7 rounded-full border-app-primary-300 text-app-primary-950 hover:bg-app-primary-500 hover:text-white"
                                                                    >
                                                                        <a href={route('gas_cylinder.show', { gas_id: row.id })}>
                                                                            <EyeIcon className="size-4" />
                                                                        </a>
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>Lihat Detail</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
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
                                                            setPage={setPageState}
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
                    <div className="flex h-14 w-full items-center justify-between rounded-b-lg border border-app-primary-300 bg-white px-4">
                        <h6 className="text-sm font-semibold">Total: {meta?.total ?? 0}</h6>
                        {rows.length > 0 ? (
                            <>
                                <div className="flex flex-row items-center justify-center gap-x-2">
                                    <Button size="icon" variant="ghost" disabled={1 === pageState} onClick={() => setCurrentPage(1)}>
                                        <ChevronFirstIcon />
                                    </Button>
                                    <Button size="icon" variant="ghost" disabled={1 === pageState} onClick={() => setCurrentPage(pageState - 1)}>
                                        <ChevronLeftIcon />
                                    </Button>
                                    <Select defaultValue={'1'} value={String(pageState)} onValueChange={(e) => setCurrentPage(Number(e))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Halaman" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from({ length: Math.ceil((meta?.total ?? 1) / perPageState) }, (_, i) => i + 1).map((link) => (
                                                <SelectItem key={link} value={link.toString()}>
                                                    {`Hal. ${link}`}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        disabled={meta?.last_page === pageState}
                                        onClick={() => setCurrentPage(pageState + 1)}
                                    >
                                        <ChevronRightIcon />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        disabled={meta?.last_page === pageState}
                                        onClick={() => setCurrentPage(meta?.last_page ?? 1)}
                                    >
                                        <ChevronLastIcon />
                                    </Button>
                                </div>

                                <Select defaultValue={String(perPageState)} onValueChange={(e) => setShowDataPerpage(Number(e))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Data perhalaman" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {PER_PAGE_LIST.map((item) => (
                                            <SelectItem key={item} value={item.toString()}>
                                                {`${item.toString()} / Halaman`}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </>
                        ) : null}
                    </div>
                </section>
            </div>
        </>
    );
}

GasCylinderIndex.layout = (page: ReactNode) => <AppLayout children={page} />;
