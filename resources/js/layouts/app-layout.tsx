import { NavMenu } from '@/components/nav-menu';
import { PropsWithChildren } from 'react';

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <main className="relative mx-auto flex h-dvh w-full max-w-[90rem] flex-col gap-y-2">
            <section className="h-20 border border-red-500">Header</section>
            <section className="h-auto flex-1 border border-blue-500">{children}</section>
            <NavMenu />
        </main>
    );
}
