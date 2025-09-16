import { LoadingState } from '@/components/custom/loading-state';
import { Tooltip } from '@/components/custom/tooltip';
import { DeleteButton } from '@/components/form/delete-button';
import { MyIcon } from '@/components/icon-lucide';
import { Input } from '@/components/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { PaginationMetaProps } from '@/types/pagination';
import { Link, router, usePage } from '@inertiajs/react';
import {
    ChevronFirstIcon,
    ChevronLastIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    DatabaseIcon,
    InfoIcon,
    MapPinnedIcon,
    PencilLineIcon,
    SearchIcon,
    XIcon,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { GasLocationDataProps } from '../types';

export function DataTable() {
    const { resources: { data: rows, meta } = { data: [], meta: undefined } } = usePage<{
        resources: { data: GasLocationDataProps[]; meta: PaginationMetaProps } | undefined;
    }>().props;

    const PER_PAGE_LIST: number[] = [4, 8, 16, 32, 64];

    const [pageState, setPageState] = useState<number>(meta?.current_page ?? 1);
    const [perPageState, setPerPageState] = useState<number>(meta?.per_page ?? 8);
    const [searchKeyword, setSearchKeyword] = useState<string | null>(null);
    const [showResetSearch, setShowResetSearch] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const searchInputRef = useRef<HTMLInputElement>(null);

    const submitPagination = ({
        page = pageState,
        perPage = perPageState,
        keyword = searchKeyword,
    }: {
        page?: number;
        perPage?: number;
        keyword?: string | null;
    }) => {
        setIsLoading(true);
        router.get(
            route('gas_location.index'),
            {
                keyword,
                page,
                per_page: perPage,
            },
            {
                replace: true,
                preserveUrl: true,
                preserveState: true,
                only: ['resources'],
                onFinish: () => {
                    setIsLoading(false);
                },
            },
        );
    };
    const debouncedSearchKeyword = useDebouncedCallback((value: string) => {
        setPageState(1);
        if (!value) {
            setShowResetSearch(false);
            setSearchKeyword('');
            if (searchKeyword?.length !== 0) {
                submitPagination({ page: 1, keyword: '' });
            }
        } else if (value.length >= 3) {
            setSearchKeyword(value);
            setShowResetSearch(true);
            submitPagination({ page: 1, keyword: value });
        }
    }, 800);

    const setCurrentPage = (pageNumber: number): number => {
        setPageState(pageNumber);
        submitPagination({ page: pageNumber });
        return pageNumber;
    };

    const setShowDataPerpage = (sum: number) => {
        {
            const currentPage = sum > perPageState ? 1 : pageState;

            setPageState(currentPage);
            setPerPageState(sum);

            submitPagination({ page: currentPage, perPage: sum });
        }
    };

    const resetSearchClicked = () => {
        setShowResetSearch(false);
        setSearchKeyword('');
        setPageState(1);
        submitPagination({ page: 1, keyword: '' });
        if (searchInputRef.current) {
            searchInputRef.current.value = '';
        }
    };

    return (
        <>
            <div className="mt-6 flex h-14 w-full items-center justify-between rounded-t-lg border border-app-primary-300 bg-white px-4">
                <div className="relative">
                    <Input
                        ref={searchInputRef}
                        id="searchInput"
                        isize={'sm'}
                        className="peer ps-9 pe-9"
                        placeholder="Cari: minimal 3 huruf..."
                        type="search"
                        defaultValue={searchKeyword ?? ''}
                        onChange={(e) => debouncedSearchKeyword(e.target.value)}
                    />
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                        <SearchIcon size={16} />
                    </div>
                    {showResetSearch ? (
                        <button
                            className="absolute inset-y-0 end-0 flex h-full w-9 cursor-pointer items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-destructive focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Reset search"
                            type="button"
                            onClick={resetSearchClicked}
                        >
                            <XIcon size={16} aria-hidden="true" />
                        </button>
                    ) : null}
                </div>
            </div>
            <div className={cn('relative flex-1 overflow-auto border-x border-app-primary-300 bg-background p-6')}>
                {isLoading ? (
                    <div className="flex-col-center h-full w-full gap-y-4 text-slate-900/70">
                        <LoadingState className="size-20 fill-app-primary-500" />
                        <span className="font-light text-app-primary-950">Memuat data...</span>
                    </div>
                ) : rows.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {rows.map((row) => (
                            <div
                                key={row.id}
                                className="relative flex flex-row items-center gap-x-4 overflow-hidden rounded-lg border border-app-primary-300 px-4 pt-8 pb-16"
                            >
                                {row.coordinates.lat !== null && row.coordinates.long !== null ? (
                                    <a
                                        href={`https://www.google.com/maps?q=${row.coordinates.lat},${row.coordinates.long}`}
                                        target="_blank"
                                        className="absolute top-0 right-0 block cursor-pointer rounded-bl-lg border-b border-l border-b-app-primary-300 border-l-app-primary-300 bg-white p-2 transition duration-150 hover:bg-green-500 hover:text-white"
                                    >
                                        <MapPinnedIcon className="pointer-events-none size-5" />
                                    </a>
                                ) : null}
                                <div
                                    className="rounded-full p-4 ring-2 ring-offset-2"
                                    style={{
                                        backgroundColor: row.color.bg,
                                        color: row.color.text,
                                    }}
                                >
                                    <MyIcon name={row.type.icon} className="size-7" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <h3 className="truncate text-lg font-semibold">{row.name}</h3>
                                    <h6 className="text-xs font-light">{row.pic}</h6>
                                </div>
                                <div className="absolute bottom-0 left-0 grid h-9 w-full grid-cols-3 border-t border-app-primary-300">
                                    <Tooltip label="Detail Data">
                                        <Link
                                            href={route('gas_location.show', { gas_location: row.id })}
                                            prefetch
                                            className="inline-flex cursor-pointer items-center justify-center bg-white transition duration-150 first:border-r first:border-r-app-primary-300 last:border-l last:border-l-app-primary-300 hover:bg-blue-500 hover:text-white [&_svg]:pointer-events-none [&_svg]:size-5"
                                        >
                                            <InfoIcon />
                                        </Link>
                                    </Tooltip>
                                    <Tooltip label="Ubah Data">
                                        <Link
                                            href={route('gas_location.edit', { gas_location: row.id })}
                                            prefetch
                                            className="inline-flex cursor-pointer items-center justify-center bg-white transition duration-150 first:border-r first:border-r-app-primary-300 last:border-l last:border-l-app-primary-300 hover:bg-amber-500 hover:text-white [&_svg]:pointer-events-none [&_svg]:size-5"
                                        >
                                            <PencilLineIcon />
                                        </Link>
                                    </Tooltip>
                                    <DeleteButton
                                        url={route('gas_location.delete', {
                                            gas_location: row.id,
                                            keyword: searchKeyword,
                                            page: [meta?.from, meta?.to].every((num) => num === meta?.from)
                                                ? pageState > 1
                                                    ? pageState - 1
                                                    : 1
                                                : pageState,
                                            per_page: perPageState,
                                        })}
                                        onlyProps={['resources']}
                                        selectedData={row.name}
                                        title="Hapus Lokasi"
                                        description={`Kamu akan menghapus lokasi <strong className="!font-bold !text-slate-950">${row.name}</strong>.`}
                                        setPage={setPageState}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex-col-center h-full w-full gap-y-4 text-slate-900/70">
                        <DatabaseIcon className="size-20" />
                        <span>Belum ada data yang tersedia.</span>
                    </div>
                )}
            </div>

            {/* Navigation */}
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
        </>
    );
}
