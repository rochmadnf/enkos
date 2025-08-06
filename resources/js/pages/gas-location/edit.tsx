import { MainContent } from '@/components/main-content';
import AppLayout from '@/layouts/app-layout';
import { Form } from '@/pages/gas-location/components/form';
import { FormDataType, FormHelperType, OptionSelectProps } from '@/pages/gas-location/types';
import { Head, usePage } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';
import { ReactNode } from 'react';
import toast from 'react-hot-toast';

export default function GasLocationEdit() {
    const { type, location } = usePage<{ type: OptionSelectProps[]; location: { data: FormDataType & { id: string } } }>().props;
    const handleUpdate = (data: FormDataType, form: FormHelperType) => {
        form.patch(route('gas_location.update', { gas_location: location.data.id }), {
            replace: true,
            onSuccess: () => {
                toast.success(`Lokasi ${data.name} berhasil diubah.`);
            },
            onError: () => {
                toast.error('Gagal memperbarui lokasi.');
            },
        });
    };

    return (
        <>
            <Head title="Ubah Data Lokasi" />
            <MainContent buttonVariant={'netral'} buttonIcon={<ArrowLeftIcon />} buttonLabel="Kembali" url={route('gas_location.index')}>
                <Form onSubmit={handleUpdate} initialData={location.data} typeOptions={type} isEditing />
            </MainContent>
        </>
    );
}

GasLocationEdit.layout = (page: ReactNode) => <AppLayout children={page} />;
