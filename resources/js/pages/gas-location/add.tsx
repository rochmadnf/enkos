import { MainContent } from '@/components/main-content';
import AppLayout from '@/layouts/app-layout';
import { Form } from '@/pages/gas-location/components/form';
import { FormDataType, FormHelperType, OptionSelectProps } from '@/pages/gas-location/types';
import { Head, usePage } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';
import { ReactNode } from 'react';
import toast from 'react-hot-toast';

export default function GasLocationEdit() {
    const { type } = usePage<{ type: OptionSelectProps[] }>().props;

    const handleCreate = (data: FormDataType, form: FormHelperType) => {
        form.post(route('gas_location.store'), {
            replace: true,
            onSuccess: () => {
                form.reset();
                toast.success(
                    <span>
                        Penambahan Lokasi <strong>"{data.name}"</strong> berhasil.
                    </span>,
                );
            },
            onError: () => {
                toast.error('Terdapat data yang tidak valid.');
            },
        });
    };

    return (
        <>
            <Head title="Tambah Lokasi" />
            <MainContent buttonVariant={'netral'} buttonIcon={<ArrowLeftIcon />} buttonLabel="Kembali" url={route('gas_location.index')}>
                <Form onSubmit={handleCreate} typeOptions={type} />
            </MainContent>
        </>
    );
}

GasLocationEdit.layout = (page: ReactNode) => <AppLayout children={page} />;
