export default function AppLayout() {
    return (
        <main className="relative mx-auto flex h-dvh w-full max-w-[90rem] flex-col gap-y-2">
            <section className="h-20 border border-red-500">Header</section>
            <section className="h-auto flex-1 border border-blue-500">Konten</section>
            <section className="h-16 border border-purple-500">Menu Navigasi</section>
        </main>
    );
}
