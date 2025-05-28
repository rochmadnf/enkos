import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Boxes, Container } from 'lucide-react';
import AppLogoIcon from './app-logo-icon';
import { UserNav } from './user-nav';

export function BottomNav() {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="fixed bottom-8 flex w-full items-center justify-center">
            <nav className="flex items-center gap-x-4 rounded-lg border border-slate-900/65 px-6 py-4">
                <div className="mr-8 flex w-32 items-center justify-center rounded-md">
                    <AppLogoIcon className="w-32" />
                </div>
                <div>
                    <Link
                        href={route('income.index')}
                        className={cn(
                            'group flex w-full items-center rounded-full border border-slate-300/50 bg-white px-4 py-3 font-medium text-gray-500 transition-all duration-200 hover:bg-slate-900/75 hover:text-white',
                        )}
                    >
                        <Container className="mr-2 size-6" />
                        <span className="tracking-wide select-none">Penjualan</span>
                    </Link>
                </div>
                <div>
                    <Link
                        href={route('product.index')}
                        className={cn(
                            'group flex w-full items-center rounded-full border border-slate-300/50 bg-white px-4 py-3 font-medium text-gray-500 transition-all duration-200 hover:bg-slate-900/75 hover:text-white',
                        )}
                    >
                        <Boxes className="mr-2 size-6" />
                        <span className="tracking-wide select-none">Produk</span>
                    </Link>
                </div>
                <UserNav user={auth.user} />
            </nav>
        </div>
    );
}
