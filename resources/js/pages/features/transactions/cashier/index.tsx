import { Input } from '@/components/input';
import AppLayout from '@/layouts/app-layout';
import { PageDataProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { SearchIcon } from 'lucide-react';
import { ReactNode } from 'react';

export default function CashierIndex() {
    const { page } = usePage<PageDataProps>().props;

    return (
        <>
            <Head title="Transaksi">
                <meta name="description" content="Daftar Transaksi" />
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

                        <div className="inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse">{/* // */}</div>
                    </div>

                    {/* list of data */}
                    <div className="px-4 py-6">
                        <div className="overflow-hidden rounded-md border border-app-primary-300">
                            <table className="w-full">
                                <thead className="bg-app-primary-500 text-app-primary-50">
                                    <tr>
                                        <th>ABC</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>On going...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* pagination */}
                    <div className="flex h-14 w-full items-center justify-between rounded-b-lg border border-app-primary-300 bg-white px-4">
                        <p>Pagination</p>
                    </div>
                </section>
            </div>
        </>
    );
}

CashierIndex.layout = (page: ReactNode) => <AppLayout children={page} />;
