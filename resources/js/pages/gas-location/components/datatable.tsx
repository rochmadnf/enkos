import { LoadingState } from '@/components/custom/loading-state';
import { Tooltip } from '@/components/custom/tooltip';
import { DeleteButton } from '@/components/form/delete-button';
import { MyIcon } from '@/components/icon-lucide';
import { SearchInput } from '@/components/search-input';
import { Pagination } from '@/components/table/pagination';
import { usePagination } from '@/hooks/use-pagination';
import { cn } from '@/lib/utils';
import { PaginationMetaProps } from '@/types/pagination';
import { Link, usePage } from '@inertiajs/react';
import { DatabaseIcon, InfoIcon, MapPinnedIcon, PencilLineIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { GasLocationDataProps } from '../types';

const PER_PAGE_LIST: number[] = [4, 8, 16, 32, 64];

export function DataTable() {
    const { resources: { data: rows, meta } = { data: [], meta: undefined } } = usePage<{
        resources: { data: GasLocationDataProps[]; meta: PaginationMetaProps } | undefined;
    }>().props;

    const [searchKeyword, setSearchKeyword] = useState<string | null>(null);
    const [showResetSearch, setShowResetSearch] = useState<boolean>(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const { pageState, perPageState, setCurrentPage, setShowDataPerpage, isLoading, submitPagination } = usePagination(meta, {
        routeName: 'gas_location.index',
        onlyProps: ['resources'],
        defaultPerPage: 8,
    });

    const debouncedSearchKeyword = useDebouncedCallback((value: string) => {
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

    const resetSearchClicked = () => {
        setShowResetSearch(false);
        setSearchKeyword('');
        submitPagination({ page: 1, keyword: '' });
        if (searchInputRef.current) {
            searchInputRef.current.value = '';
        }
    };

    return (
        <>
            <div className="mt-6 flex h-14 w-full items-center justify-between rounded-t-lg border border-app-primary-300 bg-white px-4">
                <SearchInput
                    ref={searchInputRef}
                    id="searchInput"
                    defaultValue={searchKeyword ?? ''}
                    onChange={(e) => debouncedSearchKeyword(e.target.value)}
                    onReset={resetSearchClicked}
                    showReset={showResetSearch}
                />
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
                                        description={`Kamu akan menghapus lokasi <strong className="font-bold! text-slate-950!">${row.name}</strong>.`}
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
            <Pagination
                meta={meta}
                pageState={pageState}
                perPageState={perPageState}
                perPageList={PER_PAGE_LIST}
                onPageChange={setCurrentPage}
                onPerPageChange={setShowDataPerpage}
            />
        </>
    );
}
