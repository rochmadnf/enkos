import { BottomNav } from '@/components/bottom-nav';
import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

interface AppLayoutProps {
    pageHeader?: string;
}

export default function AppLayout({ pageHeader = 'Data', children }: PropsWithChildren<AppLayoutProps>) {
    return (
        <main className="relative h-screen w-full">
            <div className="mx-16 mt-24">
                <div className="mb-4 flex flex-col justify-center">
                    <h1 className="text-4xl font-medium uppercase">{pageHeader}</h1>
                    <p className="ml-1.5 text-sm font-medium uppercase">PT. Serba Tehnik Prima</p>
                </div>
                {children}
            </div>

            <BottomNav />
            <Toaster />
        </main>
    );
}
