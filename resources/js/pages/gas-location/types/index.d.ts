import { ColorCombinationProps } from '@/types';
import { useForm } from '@inertiajs/react';
import * as lucideIcons from 'lucide-react';

export type GasLocationFormValues = {
    name: string;
    pic: string;
    type: number;
    color: null | ColorCombinationProps[];
    latitude: number | null;
    longitude: number | null;
};

export type OptionSelectProps = {
    id: number;
    name: {
        en: string;
        id: string;
    };
};

export type GasLocationDataProps = {
    id: string;
    name: string;
    pic: string;
    color: {
        bg: string;
        text: string;
    };
    type: {
        icon: keyof typeof lucideIcons;
        lang: {
            id: string;
        };
    };
    coordinates: {
        lat: number | null;
        long: number | null;
    };
};

export type FormHelperType = ReturnType<typeof useForm<Omit<GasLocationFormValues, 'color'>>>;
export type FormDataType = Omit<GasLocationFormValues, 'color'>;
