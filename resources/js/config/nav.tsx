import { Flame, LayoutGrid, LogOut, LucideIcon, MapPinned, User } from 'lucide-react';
import { RefObject } from 'react';

// @User Menu
export interface UserNavItemProps {
    id: string;
    href: string;
    icon?: LucideIcon | null;
    label: string;
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
    asButton?: boolean;
    separator?: boolean;
}

export const USER_NAV_ITEMS: UserNavItemProps[] = [
    {
        id: 'uni_001',
        href: '#',
        icon: User,
        label: 'Profil',
        separator: true,
    },
    {
        id: 'uni_002',
        href: route('logout'),
        icon: LogOut,
        label: 'Keluar',
        asButton: true,
        method: 'post',
    },
];

// @Navigation Menu
export interface NavItem {
    uuid: string;
    title: string;
    href: string;
    icon?: LucideIcon | null;
    permissions: string[];
}

export interface NavItemProps extends Omit<NavItem, 'permissions' | 'icon'> {
    isActive: boolean;
    refCallback: (el: HTMLLIElement | null) => void;
}

export interface ActiveIndicatorProps {
    activeUuid: string;
    itemRefs: RefObject<Map<string, HTMLLIElement>>;
}

export const NAV_ITEMS: NavItem[] = [
    {
        uuid: '9f6dae8c-f501-419c-83eb-0d68df9080a2',
        title: 'Dashboard',
        href: route('dashboard'),
        icon: LayoutGrid,
        permissions: [],
    },
    {
        uuid: '9f6daee3-f6b0-49f3-a296-c731b9376a99',
        title: 'Tabung',
        href: route('cylinder.gas'),
        icon: Flame,
        permissions: [],
    },
    {
        uuid: '9f6daee5-c3e5-413c-981f-08ce14c466e1',
        title: 'Lokasi',
        href: route('locations'),
        icon: MapPinned,
        permissions: [],
    },
];
