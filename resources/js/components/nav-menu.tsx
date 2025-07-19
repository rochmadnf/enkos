import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { gsap } from 'gsap';
import { Flame, LayoutGrid, LucideIcon, MapPinned } from 'lucide-react';
import { useEffect, useRef } from 'react';

export interface NavItem {
    uuid: string;
    title: string;
    href: string;
    icon?: LucideIcon | null;
    permissions: string[];
}

export type PageDataProps = {
    page: {
        uuid: string;
    };
};

const navItems: NavItem[] = [
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

export function NavMenu() {
    return (
        <nav aria-label="navigation-menu" dir="ltr" className="relative flex h-24 flex-row items-start justify-center">
            <div className="relative">
                <NavItemWrappers />
                <ActiveIndicator />
            </div>
        </nav>
    );
}

export function NavItemWrappers() {
    return (
        <ul className="relative flex gap-x-4 rounded-md bg-white/90 px-6 pt-2 pb-4 text-lg font-medium text-gray-500 uppercase shadow-lg ring-1 shadow-slate-300/50 ring-slate-300 backdrop-blur-sm">
            {navItems.map((menu) => (
                <NavItem key={menu.uuid} title={menu.title} uuid={menu.uuid} href={menu.href} icon={menu.icon} />
            ))}
        </ul>
    );
}

export function NavItem({ href, title, icon, uuid }: Omit<NavItem, 'permissions'>) {
    const { page } = usePage<PageDataProps>().props;
    const isActive = page.uuid === uuid;

    return (
        <li
            data-active={isActive}
            data-uuid={uuid}
            className={cn('group relative block px-3 py-2 transition-colors duration-500 hover:text-crimson', isActive ? 'text-crimson' : null)}
        >
            <Link href={href} prefetch className="relative z-10 inline-flex items-center gap-x-1.5">
                {title}
            </Link>
        </li>
    );
}

export function ActiveIndicator() {
    const { page } = usePage<PageDataProps>().props;
    const indicatorRef = useRef<HTMLSpanElement>(null);
    const firstLoad = useRef(true);

    useEffect(() => {
        const animate = () => {
            const activeEl = document.querySelector<HTMLLIElement>(`li[data-active="true"]`);
            const indicator = indicatorRef.current;
            if (!activeEl || !indicator) return;

            const rect = activeEl.getBoundingClientRect();
            const parentRect = activeEl.parentElement!.getBoundingClientRect();

            const parentWidth = rect.width;
            const percentage = 0.85;
            const width = parentWidth * percentage;

            const x = rect.left - parentRect.left + (parentWidth - width) / 2;

            if (firstLoad.current) {
                gsap.set(indicator, { x, width });
                firstLoad.current = false;
            } else {
                const tl = gsap.timeline();

                tl.to(indicator, {
                    // ✅ Step 1: shrink slightly before moving
                    scaleX: 0.8,
                    duration: 0.15,
                    ease: 'power1.in',
                }).to(indicator, {
                    // ✅ Step 2: move + bounce to final position
                    x,
                    width,
                    scaleX: 1, // grow back to normal width
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.6)',
                });
            }
        };

        const raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, [page.uuid]);

    return (
        <span
            ref={indicatorRef}
            className="absolute bottom-4 left-0 h-1 rounded-full bg-crimson/90"
            style={{ width: 0, transform: 'translateX(0px)' }}
        ></span>
    );
}
