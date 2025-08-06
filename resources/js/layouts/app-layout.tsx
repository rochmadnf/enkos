import { Header } from '@/components/header';
import { NavMenu } from '@/components/nav-menu';
import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <div className="relative mx-auto flex h-dvh min-h-0 w-full max-w-[90rem] flex-col gap-y-2 px-8 text-slate-900 @min-[90rem]:px-0">
            <Header />
            <main className="flex h-full min-h-0 w-full flex-1 flex-col py-4">{children}</main>
            <NavMenu />
            <Toaster
                toastOptions={{
                    duration: 5000,
                }}
            />
        </div>
    );
}
