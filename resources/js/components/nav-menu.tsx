import { Link } from '@inertiajs/react';
import { Flame, LayoutGrid, LucideIcon, MapPinned } from 'lucide-react';
import { PropsWithChildren } from 'react';

export interface NavItem {
    uuid: string;
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

const navItems: NavItem[] = [
    {
        uuid: 'D001',
        title: 'Dashboard',
        href: route('dashboard'),
        icon: LayoutGrid,
    },
    {
        uuid: 'TB001',
        title: 'Tabung',
        href: '#',
        icon: Flame,
    },
    {
        uuid: 'LK001',
        title: 'Lokasi',
        href: '#',
        icon: MapPinned,
    },
];

export function NavMenu() {
    return (
        <nav aria-label="navigation-menu" dir="ltr" className="flex h-24 flex-row items-start justify-center">
            <NavItemWrappers>
                {navItems.map((menu) => (
                    <NavItem key={menu.uuid} title={menu.title} href={menu.href} icon={menu.icon} />
                ))}
            </NavItemWrappers>
        </nav>
    );
}

export function NavItemWrappers({ children }: PropsWithChildren) {
    return (
        <ul className="flex gap-x-4 rounded-md bg-white/90 px-6 py-2 text-lg font-medium text-gray-500 uppercase shadow-lg ring-1 shadow-slate-300/50 ring-slate-300 backdrop-blur-sm">
            {children}
        </ul>
    );
}

export function NavItem({ href, title, icon, isActive }: Omit<NavItem, 'uuid'>) {
    const Icon = icon;
    return (
        <li className="group relative block px-3 py-2 transition-colors duration-500 hover:text-crimson motion-reduce:transition-none">
            <Link href={href} prefetch className="inline-flex items-center gap-x-1.5">
                <span>{title}</span>
            </Link>
            <span className="absolute bottom-1 left-1/2 h-1 w-0.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/90 transition-all duration-500 group-hover:w-3/4 group-hover:bg-crimson/90"></span>
        </li>
    );
}
