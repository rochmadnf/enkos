export default function AppLayout(){
    return (
        <main className="relative flex flex-col h-dvh gap-y-2 w-full mx-auto max-w-[90rem]">
            <section className="border border-red-500 h-20">
Header
            </section>
            <section className="flex-1 border border-blue-500 h-auto">
Konten
            </section>
            <section className="border border-purple-500 h-16">
Menu Navigasi
            </section>
        </main>
    );
}