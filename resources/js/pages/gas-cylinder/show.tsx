import { LoadingState } from '@/components/custom/loading-state';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { ThousandSeparatorID } from '@/lib/utils';
import { PageDataProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeftIcon, DatabaseIcon, MapPinIcon, TrendingUpIcon } from 'lucide-react';
import { ReactNode } from 'react';

export type GasCylinderDetailProps = {
    id: string;
    name: string;
    total_stock: number;
    stock_isi: number;
    stock_kosong: number;
    stock_bocor: number;
    created_at: string;
};

export type GasCylinderLocationStockProps = {
    id: string;
    location_id: string;
    location_name: string;
    stock_isi: number;
    stock_kosong: number;
    stock_bocor: number;
    stock_pinjam: number;
    stock_dipinjam: number;
    total_stock: number;
};

export type GasCylinderPriceHistoryProps = {
    id: string;
    location_name: string;
    capital_price: number;
    base_price: number;
    retail_price: number;
    stock: number;
    status: number;
    status_label: string;
    created_at: string;
};

export default function GasCylinderShow() {
    const {
        page,
        gasCylinder: { data: detail } = { data: undefined },
        locationStocks = [],
        priceHistories = [],
    } = usePage<
        PageDataProps & {
            gasCylinder?: { data: GasCylinderDetailProps };
            locationStocks?: GasCylinderLocationStockProps[];
            priceHistories?: GasCylinderPriceHistoryProps[];
        }
    >().props;

    if (!detail) {
        return (
            <>
                <Head title="Detail Tabung Gas" />
                <div className="flex-center h-screen w-full">
                    <LoadingState className="size-20 fill-app-primary-500" />
                </div>
            </>
        );
    }

    return (
        <>
            <Head title={`Detail: ${detail.name}`}>
                <meta name="description" content={`Detail informasi tabung gas ${detail.name}`} />
            </Head>

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1 text-app-primary-950">
                        <h1 className="text-2xl font-semibold tracking-wide uppercase sm:text-3xl">{page.name}</h1>
                        <p className="text-sm font-light tracking-wider sm:text-base">{page.description}</p>
                    </div>
                    <Link href={route('gas_cylinder.index')}>
                        <Button variant="outline" className="border-app-primary-300 text-app-primary-900 hover:bg-app-primary-50">
                            <ArrowLeftIcon className="mr-2 size-4" />
                            Kembali
                        </Button>
                    </Link>
                </div>

                {/* Info Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* Total Stock Card */}
                    <Card className="border-app-primary-300">
                        <CardHeader className="pb-3">
                            <CardDescription className="text-app-primary-600">Total Stok</CardDescription>
                            <CardTitle className="text-4xl text-app-primary-950">{ThousandSeparatorID(detail.total_stock)}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-app-primary-500">Semua tabung gas</div>
                        </CardContent>
                    </Card>

                    {/* Stock Isi Card */}
                    <Card className="border-green-300 bg-green-50/50">
                        <CardHeader className="pb-3">
                            <CardDescription className="text-green-700">Stok Isi</CardDescription>
                            <CardTitle className="text-4xl text-green-900">{ThousandSeparatorID(detail.stock_isi)}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-green-600">Tabung berisi gas</div>
                        </CardContent>
                    </Card>

                    {/* Stock Kosong Card */}
                    <Card className="border-blue-300 bg-blue-50/50">
                        <CardHeader className="pb-3">
                            <CardDescription className="text-blue-700">Stok Kosong</CardDescription>
                            <CardTitle className="text-4xl text-blue-900">{ThousandSeparatorID(detail.stock_kosong)}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-blue-600">Tabung kosong</div>
                        </CardContent>
                    </Card>

                    {/* Stock Bocor Card */}
                    <Card className="border-red-300 bg-red-50/50">
                        <CardHeader className="pb-3">
                            <CardDescription className="text-red-700">Stok Bocor</CardDescription>
                            <CardTitle className="text-4xl text-red-900">{ThousandSeparatorID(detail.stock_bocor)}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-red-600">Tabung bocor/rusak</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs Section */}
                <Tabs defaultValue="locations" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-app-primary-100">
                        <TabsTrigger value="locations" className="data-[state=active]:bg-app-primary-500 data-[state=active]:text-white">
                            <MapPinIcon className="mr-2 size-4" />
                            Lokasi & Stok
                        </TabsTrigger>
                        <TabsTrigger value="history" className="data-[state=active]:bg-app-primary-500 data-[state=active]:text-white">
                            <TrendingUpIcon className="mr-2 size-4" />
                            Riwayat Harga
                        </TabsTrigger>
                    </TabsList>

                    {/* Location Stocks Tab */}
                    <TabsContent value="locations" className="mt-4">
                        <Card className="border-app-primary-300">
                            <CardHeader>
                                <CardTitle className="text-app-primary-950">Distribusi Stok per Lokasi</CardTitle>
                                <CardDescription>Daftar lokasi dan stok tabung gas berdasarkan label</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-hidden rounded-md border border-app-primary-300">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-app-primary-500 hover:bg-app-primary-500">
                                                <TableHead className="font-semibold text-app-primary-50">Lokasi</TableHead>
                                                <TableHead className="text-center font-semibold text-app-primary-50">Isi</TableHead>
                                                <TableHead className="text-center font-semibold text-app-primary-50">Kosong</TableHead>
                                                <TableHead className="text-center font-semibold text-app-primary-50">Bocor</TableHead>
                                                <TableHead className="text-center font-semibold text-app-primary-50">Pinjam</TableHead>
                                                <TableHead className="text-center font-semibold text-app-primary-50">Dipinjam</TableHead>
                                                <TableHead className="text-right font-semibold text-app-primary-50">Total</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {locationStocks.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={7} className="h-48">
                                                        <div className="flex flex-col items-center justify-center gap-y-4 text-app-primary-950/70">
                                                            <DatabaseIcon className="size-16 text-app-primary-400" />
                                                            <span className="font-light">Belum ada data distribusi stok.</span>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                locationStocks.map((stock) => (
                                                    <TableRow key={stock.id} className="border-app-primary-200">
                                                        <TableCell className="font-medium text-app-primary-950">{stock.location_name}</TableCell>
                                                        <TableCell className="text-center text-green-700">
                                                            {ThousandSeparatorID(stock.stock_isi)}
                                                        </TableCell>
                                                        <TableCell className="text-center text-blue-700">
                                                            {ThousandSeparatorID(stock.stock_kosong)}
                                                        </TableCell>
                                                        <TableCell className="text-center text-red-700">
                                                            {ThousandSeparatorID(stock.stock_bocor)}
                                                        </TableCell>
                                                        <TableCell className="text-center text-orange-700">
                                                            {ThousandSeparatorID(stock.stock_pinjam)}
                                                        </TableCell>
                                                        <TableCell className="text-center text-purple-700">
                                                            {ThousandSeparatorID(stock.stock_dipinjam)}
                                                        </TableCell>
                                                        <TableCell className="text-right font-bold text-app-primary-950">
                                                            {ThousandSeparatorID(stock.total_stock)}
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Price History Tab */}
                    <TabsContent value="history" className="mt-4">
                        <Card className="border-app-primary-300">
                            <CardHeader>
                                <CardTitle className="text-app-primary-950">Riwayat Harga Input Stok</CardTitle>
                                <CardDescription>History perubahan harga dan input stok tabung gas</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-hidden rounded-md border border-app-primary-300">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-app-primary-500 hover:bg-app-primary-500">
                                                <TableHead className="font-semibold text-app-primary-50">Tanggal</TableHead>
                                                <TableHead className="font-semibold text-app-primary-50">Lokasi</TableHead>
                                                <TableHead className="font-semibold text-app-primary-50">Status</TableHead>
                                                <TableHead className="text-right font-semibold text-app-primary-50">Stok</TableHead>
                                                <TableHead className="text-right font-semibold text-app-primary-50">Harga Modal</TableHead>
                                                <TableHead className="text-right font-semibold text-app-primary-50">Harga Pangkalan</TableHead>
                                                <TableHead className="text-right font-semibold text-app-primary-50">Harga Eceran</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {priceHistories.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={7} className="h-48">
                                                        <div className="flex flex-col items-center justify-center gap-y-4 text-app-primary-950/70">
                                                            <DatabaseIcon className="size-16 text-app-primary-400" />
                                                            <span className="font-light">Belum ada riwayat harga dan stok.</span>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                priceHistories.map((history) => (
                                                    <TableRow key={history.id} className="border-app-primary-200">
                                                        <TableCell className="whitespace-nowrap text-app-primary-950">{history.created_at}</TableCell>
                                                        <TableCell className="text-app-primary-950">{history.location_name}</TableCell>
                                                        <TableCell>
                                                            <span
                                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                                    history.status === 1
                                                                        ? 'bg-green-100 text-green-800'
                                                                        : history.status === 2
                                                                          ? 'bg-blue-100 text-blue-800'
                                                                          : 'bg-red-100 text-red-800'
                                                                }`}
                                                            >
                                                                {history.status_label}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="text-right text-app-primary-950">
                                                            {ThousandSeparatorID(history.stock)}
                                                        </TableCell>
                                                        <TableCell className="text-right text-app-primary-950">
                                                            Rp {ThousandSeparatorID(history.capital_price)}
                                                        </TableCell>
                                                        <TableCell className="text-right text-app-primary-950">
                                                            Rp {ThousandSeparatorID(history.base_price)}
                                                        </TableCell>
                                                        <TableCell className="text-right text-app-primary-950">
                                                            Rp {ThousandSeparatorID(history.retail_price)}
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}

GasCylinderShow.layout = (page: ReactNode) => <AppLayout children={page} />;
