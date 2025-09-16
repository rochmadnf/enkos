import { Header } from '@/components/header';
import { Nav } from '@/components/nav';
import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <div className="relative flex min-h-screen w-full flex-col">
            <Header />
            <main className="flex flex-1 flex-col pb-10">
                <div className="container-wrapper flex-1">{children}</div>
            </main>
            <Nav />
            <Toaster
                toastOptions={{
                    duration: 5000,
                }}
            />
        </div>
    );
}
