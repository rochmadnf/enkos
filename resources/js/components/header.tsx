import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { PageDataProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { HomeIcon } from 'lucide-react';
import AppLogo from './app-logo';
import { UserNav } from './user-nav';

export function Header() {
    const { page } = usePage<PageDataProps>().props;

    return (
        <header className="relative flex max-h-28 min-h-[90px] flex-row items-center justify-between rounded-b-2xl border border-t-0 border-app-primary-300/70 bg-white px-8 py-6">
            <div className="flex flex-row items-center gap-x-4">
                <div className="flex w-40 items-center justify-center rounded-md">
                    <AppLogo className="w-full" />
                </div>
                <div className="flex flex-col gap-y-1.5">
                    <h1 className="scroll-m-20 text-[1.75rem] leading-[calc(2.1_/_1.75)] font-semibold tracking-tight uppercase select-none">
                        {page.name}
                    </h1>
                    <BreadcrumbNav breadcrumbs={page.breadcrumbs} />
                </div>
            </div>

            <UserNav />
        </header>
    );
}

export function BreadcrumbNav({ breadcrumbs }: Pick<PageDataProps['page'], 'breadcrumbs'>) {
    return (
        <Breadcrumb>
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
                    <BreadcrumbLink asChild>
                        <Link href={href}>{label}</Link>
                    </BreadcrumbLink>
                ) : (
                    <BreadcrumbPage className="text-app-primary-600">{label}</BreadcrumbPage>
                )}
            </BreadcrumbItem>
            {!isLastItem ? <BreadcrumbSeparator> / </BreadcrumbSeparator> : null}
        </>
    );
}
