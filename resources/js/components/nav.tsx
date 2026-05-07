import { NAV_ITEMS, NavItemProps } from '@/config/nav';
import { cn } from '@/lib/utils';
import { PageDataProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function Nav() {
    const { page, auth } = usePage<PageDataProps>().props as any;

    const user_permissions = auth?.user?.permissions ?? null;

    console.log('role', auth?.user?.role, 'superior role', import.meta.env.VITE_APP_SUPERIOR_ROLE_NAME);

    return (
        <div className="border-grid fixed bottom-0 w-full border-t bg-white">
            <div className="container-wrapper">
                <nav aria-label="navigation-menu" dir="ltr" className="h-10">
                    <ul className="relative flex h-full uppercase">
                        {NAV_ITEMS.map((menu) => {
                            if (
                                menu.permissions.length == 0 ||
                                user_permissions?.some((permission: string) => menu.permissions.includes(permission)) ||
                                auth?.user?.role === import.meta.env.VITE_APP_SUPERIOR_ROLE_NAME
                            ) {
                                return <Item {...menu} key={menu.uuid} isActive={page.uuid === menu.uuid} />;
                            }
                            return null;
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export function Item({ href, title, isActive }: Omit<NavItemProps, 'refCallback'>) {
    return (
        <li data-active={isActive} className={cn('h-full border-r border-app-primary-300/70 px-2', isActive ? 'bg-app-primary-200/70' : '')}>
            <Link href={href} className="inline-flex h-full items-center gap-x-1.5 text-app-primary-950" aria-current={isActive ? 'page' : undefined}>
                {title}
            </Link>
        </li>
    );
}
