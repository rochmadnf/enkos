import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { PageDataProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { EllipsisIcon, FileSymlinkIcon, FunnelPlusIcon, SearchIcon } from 'lucide-react';
import { CSSProperties, ReactNode } from 'react';
import { ButtonAdd } from './partials/_btn-add';

export default function GasCylinderIndex() {
    const { page } = usePage<PageDataProps>().props;
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
                    <div className="flex flex-row items-center justify-between border-b border-b-app-primary-300 p-4">
                        <div className="relative">
                            <Input
                                id="searchInput"
                                className="peer border border-app-primary-300 ps-9.5 pe-9 text-app-primary-900 placeholder:text-app-primary-400/80 focus-within:text-app-primary-900 focus:text-app-primary-900 focus-visible:border-app-primary-500 focus-visible:text-app-primary-900 focus-visible:ring-app-primary-300/50"
                                placeholder="Cari: minimal 3 huruf..."
                                type="search"
                            />
                            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-app-primary-400/80 peer-not-placeholder-shown:text-app-primary-900 peer-placeholder-shown:text-app-primary-400/80 peer-disabled:opacity-50">
                                <SearchIcon className="size-5" />
                            </div>
                        </div>

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
                                        <th rowSpan={2} className="border-r border-b border-app-primary-300 py-2 last:border-r-0">
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
                                    <tr className="border-b border-app-primary-300 last:border-b-0">
                                        <td className="border-r border-e-app-primary-300 p-2.5 last:border-r-0">Refill 5.5Kg</td>
                                        <td className="border-r border-e-app-primary-300 p-2.5 text-center last:border-r-0">34</td>
                                        <td className="border-r border-e-app-primary-300 p-2.5 text-center last:border-r-0">100</td>
                                        <td className="border-r border-e-app-primary-300 p-2.5 text-center last:border-r-0">4</td>
                                        <td className="border-r border-e-app-primary-300 p-2.5 text-center last:border-r-0">0</td>
                                        <td className="border-r border-e-app-primary-300 p-2.5 text-center last:border-r-0">0</td>
                                        <td className="border-r border-e-app-primary-300 p-2.5 text-center font-bold last:border-r-0">138</td>
                                        <td className="border-r border-e-app-primary-300 p-2.5 last:border-r-0">...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* pagination */}
                </section>
            </div>
        </>
    );
}

GasCylinderIndex.layout = (page: ReactNode) => <AppLayout children={page} />;
