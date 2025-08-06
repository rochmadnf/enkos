import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { PageDataProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { HomeIcon } from 'lucide-react';
import AppLogo from './app-logo';
import { UserNav } from './user-nav';

export function Header() {
    const { page } = usePage<PageDataProps>().props;

    return (
        <header className="relative flex max-h-28 min-h-[90px] flex-row items-center justify-between rounded-b-2xl border border-t-0 border-app-primary-300/70 bg-app-primary-100/50 px-8 py-6">
            <div className="flex flex-row items-center gap-x-4">
                <div className="flex w-36 items-center justify-center rounded-md sm:w-40">
                    <AppLogo className="w-full" />
                </div>
                <BreadcrumbNav breadcrumbs={page.breadcrumbs} />
            </div>

            <UserNav />
        </header>
    );
}

export function BreadcrumbNav({ breadcrumbs }: Pick<PageDataProps['page'], 'breadcrumbs'>) {
    return (
        <Breadcrumb className="hidden md:block">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="#">
                        <HomeIcon size={16} aria-hidden="true" />
                        <span className="sr-only">Home</span>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator> / </BreadcrumbSeparator>
                {breadcrumbs.map((bc, index) => (
                    <BreadcrumbNavItem key={bc.id} {...bc} isLastItem={index === breadcrumbs.length - 1} />
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export function BreadcrumbNavItem({ href, label, isLastItem = false }: { href: string; label: string; isLastItem?: boolean }) {
    return (
        <>
            <BreadcrumbItem>
                {!isLastItem ? (
                    <BreadcrumbLink asChild className="hover:text-app-primary-950">
                        <Link href={href}>{label}</Link>
                    </BreadcrumbLink>
                ) : (
                    <BreadcrumbPage className="text-app-primary-950">{label}</BreadcrumbPage>
                )}
            </BreadcrumbItem>
            {!isLastItem ? <BreadcrumbSeparator> / </BreadcrumbSeparator> : null}
        </>
    );
}
