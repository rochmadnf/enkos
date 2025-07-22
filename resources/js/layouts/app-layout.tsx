import { Header } from '@/components/header';
import { NavMenu } from '@/components/nav-menu';
import { PropsWithChildren } from 'react';

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <div className="relative mx-auto flex h-dvh w-full max-w-[90rem] flex-col gap-y-2 px-8 text-slate-900 @min-[90rem]:px-0">
            <Header />
            <main className="flex h-auto w-full flex-1 flex-col py-4">{children}</main>
            <NavMenu />
        </div>
    );
}
