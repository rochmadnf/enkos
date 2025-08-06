import { FormInput } from '@/components/form/input';
import { FormInputNumber } from '@/components/form/input-number';
import { FormSelect } from '@/components/form/select';
import { SelectItem } from '@/components/select';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { CoordinatesFormat } from '@/config/format-input-number';
import { FormDataType, FormHelperType, OptionSelectProps } from '@/pages/gas-location/types';
import { Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

interface FormProps {
    initialData?: Partial<FormDataType>;
    onSubmit: (data: FormDataType, formHelpers: FormHelperType) => void;
    typeOptions: OptionSelectProps[];
    isEditing?: boolean;
}

export function Form({ initialData, onSubmit, typeOptions, isEditing = false }: FormProps) {
    const form = useForm<FormDataType>({
        name: initialData?.name ?? '',
        pic: initialData?.pic ?? '',
        type: initialData?.type ?? 0,
        longitude: initialData?.longitude ?? null,
        latitude: initialData?.latitude ?? null,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        onSubmit(form.data, form);
    };

    return (
        <CardContent className="relative min-h-0 min-w-0 flex-1 overflow-auto rounded-md border border-app-primary-300/70 bg-white py-6">
            <form onSubmit={handleSubmit}>
                <fieldset disabled={form.processing} className="w-full space-y-2.5">
                    <FormInput
                        label="Nama Lokasi"
                        tabIndex={1}
                        required
                        autoFocus
                        name="name"
                        value={form.data.name}
                        onChange={(e) => form.setData('name', e.target.value)}
                        error={form.errors.name}
                    />
                    <FormInput
                        label="Penanggung Jawab"
                        tabIndex={2}
                        required
                        name="pic"
                        value={form.data.pic}
                        onChange={(e) => form.setData('pic', e.target.value)}
                        error={form.errors.pic}
                    />
                    <FormSelect
                        label="Tipe Lokasi"
                        name="type"
                        required
                        value={form.data.type !== 0 ? form.data.type.toString() : undefined}
                        onValueChange={(e) => form.setData('type', Number(e))}
                        tabIndex={3}
                        error={form.errors.type}
                    >
                        {typeOptions.map((opt) => (
                            <SelectItem key={opt.id} value={opt.id.toString()}>
                                {opt.name.id}
                            </SelectItem>
                        ))}
                    </FormSelect>
                    <div className="flex w-full flex-col items-center justify-between gap-x-6 md:flex-row">
                        <FormInputNumber
                            isRequired={form.data.longitude !== null}
                            label={{ name: 'Latitude', class: 'text-[15px] leading-4' }}
                            input={{
                                placeholder: '-0.9083537631530236',
                                class: 'mt-2.5',
                                tabIndex: 4,
                            }}
                            formatOptions={CoordinatesFormat()}
                            onChange={(e) => form.setData('latitude', isNaN(e) ? null : e)}
                            value={form.data.latitude ?? undefined}
                            error={form.errors.latitude}
                        />
                        <FormInputNumber
                            isRequired={form.data.latitude !== null}
                            label={{ name: 'Longitude', class: 'text-[15px] leading-4' }}
                            input={{
                                placeholder: '119.88368759645714',
                                class: 'mt-2.5',
                                tabIndex: 5,
                            }}
                            formatOptions={CoordinatesFormat()}
                            onChange={(e) => form.setData('longitude', isNaN(e) ? null : e)}
                            value={form.data.longitude ?? undefined}
                            error={form.errors.longitude}
                        />
                    </div>
                    <div className="flex items-center gap-x-4">
                        <Button size="full" tabIndex={6} className="max-w-fit" disabled={form.processing}>
                            {form.processing ? <LoaderCircle className="size-5 animate-spin" /> : null}
                            {isEditing ? 'Ubah Data' : 'Simpan'}
                        </Button>
                        <Button size={'full'} variant={'outline-destructive'} tabIndex={7} className="max-w-fit" asChild>
                            <Link href={route('gas_location.index')} replace prefetch>
                                Batal
                            </Link>
                        </Button>
                    </div>
                </fieldset>
            </form>
        </CardContent>
    );
}
