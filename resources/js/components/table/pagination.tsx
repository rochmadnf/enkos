import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PaginationMetaProps } from '@/types/pagination';
import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

export interface PaginationProps {
    meta: PaginationMetaProps | undefined;
    pageState: number;
    perPageState: number;
    perPageList: number[];
    onPageChange: (page: number) => void;
    onPerPageChange: (perPage: number) => void;
    showTotal?: boolean;
}

export function Pagination({ meta, pageState, perPageState, perPageList, onPageChange, onPerPageChange, showTotal = true }: PaginationProps) {
    const totalPages = Math.ceil((meta?.total ?? 1) / perPageState);
    const hasData = (meta?.total ?? 0) > 0;

    return (
        <div className="flex h-14 w-full items-center justify-between rounded-b-lg border-t border-app-primary-300 bg-white px-4">
            {showTotal && <h6 className="text-sm font-semibold">Total: {meta?.total ?? 0}</h6>}

            {hasData ? (
                <>
                    <div className="flex flex-row items-center justify-center gap-x-2">
                        <Button size="icon" variant="ghost" disabled={pageState === 1} onClick={() => onPageChange(1)} aria-label="First page">
                            <ChevronFirstIcon />
                        </Button>
                        <Button
                            size="icon"
                            variant="ghost"
                            disabled={pageState === 1}
                            onClick={() => onPageChange(pageState - 1)}
                            aria-label="Previous page"
                        >
                            <ChevronLeftIcon />
                        </Button>
                        <Select defaultValue="1" value={String(pageState)} onValueChange={(e) => onPageChange(Number(e))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Halaman" />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <SelectItem key={page} value={page.toString()}>
                                        {`Hal. ${page}`}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button
                            size="icon"
                            variant="ghost"
                            disabled={meta?.last_page === pageState}
                            onClick={() => onPageChange(pageState + 1)}
                            aria-label="Next page"
                        >
                            <ChevronRightIcon />
                        </Button>
                        <Button
                            size="icon"
                            variant="ghost"
                            disabled={meta?.last_page === pageState}
                            onClick={() => onPageChange(meta?.last_page ?? 1)}
                            aria-label="Last page"
                        >
                            <ChevronLastIcon />
                        </Button>
                    </div>

                    <Select defaultValue={String(perPageState)} onValueChange={(e) => onPerPageChange(Number(e))}>
                        <SelectTrigger>
                            <SelectValue placeholder="Data perhalaman" />
                        </SelectTrigger>
                        <SelectContent>
                            {perPageList.map((item) => (
                                <SelectItem key={item} value={item.toString()}>
                                    {`${item.toString()} / Halaman`}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </>
            ) : null}
        </div>
    );
}
