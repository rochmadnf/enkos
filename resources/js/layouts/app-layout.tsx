import { Header } from '@/components/header';
import { NavMenu } from '@/components/nav-menu';
import { PropsWithChildren } from 'react';

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <main className="relative mx-auto flex h-dvh w-full max-w-[90rem] flex-col gap-y-2 text-slate-900">
            <Header />
            <section className="h-auto flex-1 border border-blue-500">{children}</section>
            <NavMenu />
        </main>
    );
}
