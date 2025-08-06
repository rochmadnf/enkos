import { MyIcon } from '@/components/icon-lucide';

import { Tooltip } from '@/components/custom/tooltip';
import { DeleteButton } from '@/components/form/delete-button';
import { GasLocationDataProps } from '@/pages/gas-location/types';
import { Link } from '@inertiajs/react';
import { InfoIcon, MapPinnedIcon, PencilLineIcon } from 'lucide-react';

export function Card({ fromTo, page, perPage, ...row }: GasLocationDataProps & { fromTo: number[]; page: number; perPage: number }) {
    return (
        <div className="relative flex flex-row items-center gap-x-4 overflow-hidden rounded-lg border border-app-primary-300 px-4 pt-8 pb-16">
            {row.coordinates.lat !== null && row.coordinates.long !== null ? (
                <a
                    href={`https://www.google.com/maps?q=${row.coordinates.lat},${row.coordinates.long}`}
                    target="_blank"
                    className="absolute top-0 right-0 block cursor-pointer rounded-bl-lg border-b border-l border-b-app-primary-300 border-l-app-primary-300 bg-white p-2 transition duration-150 hover:bg-green-500 hover:text-white"
                >
                    <MapPinnedIcon className="pointer-events-none size-5" />
                </a>
            ) : null}
            <div
                className="rounded-full p-4 ring-2 ring-offset-2"
                style={{
                    backgroundColor: row.color.bg,
                    color: row.color.text,
                }}
            >
                <MyIcon name={row.type.icon} className="size-7" />
            </div>
            <div className="flex-1 overflow-hidden">
                <h3 className="truncate text-lg font-semibold">{row.name}</h3>
                <h6 className="text-xs font-light">{row.pic}</h6>
            </div>
            <div className="absolute bottom-0 left-0 grid h-9 w-full grid-cols-3 border-t border-app-primary-300">
                <Tooltip label="Detail Data">
                    <button className="inline-flex cursor-pointer items-center justify-center bg-white transition duration-150 first:border-r first:border-r-app-primary-300 last:border-l last:border-l-app-primary-300 hover:bg-blue-500 hover:text-white [&_svg]:pointer-events-none [&_svg]:size-5">
                        <InfoIcon />
                    </button>
                </Tooltip>
                <Tooltip label="Ubah Data">
                    <Link
                        href={route('gas_location.edit', { gas_location: row.id })}
                        prefetch
                        className="inline-flex cursor-pointer items-center justify-center bg-white transition duration-150 first:border-r first:border-r-app-primary-300 last:border-l last:border-l-app-primary-300 hover:bg-amber-500 hover:text-white [&_svg]:pointer-events-none [&_svg]:size-5"
                    >
                        <PencilLineIcon />
                    </Link>
                </Tooltip>
                <DeleteButton
                    url={route('gas_location.delete', {
                        gas_location: row.id,
                        page: fromTo.every((num) => num === fromTo[0]) ? 1 : page,
                        per_page: perPage,
                    })}
                    onlyProps={['resources']}
                    selectedData={row.name}
                    title="Hapus Lokasi"
                    description={`Kamu akan menghapus lokasi <strong className="!font-bold !text-slate-950">${row.name}</strong>.`}
                />
            </div>
        </div>
    );
}
