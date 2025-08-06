import { cn } from '@/lib/utils';
import { PageDataProps } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { VariantProps } from 'class-variance-authority';
import { PropsWithChildren, ReactNode } from 'react';
import { IconButtonExpandable, iconButtonExpandableVariants } from './animate/button-expandable';
import { Card } from './ui/card';

export interface MainContent {
    buttonVariant?: VariantProps<typeof iconButtonExpandableVariants>['variant'];
    buttonIcon: ReactNode;
    buttonLabel: string;
    url: string;
    className?: string;
}

export function MainContent({ className, buttonLabel, buttonVariant = 'default', buttonIcon, url, children }: PropsWithChildren<MainContent>) {
    const { page } = usePage<PageDataProps>().props;
    return (
        <Card className={cn('h-full min-h-0 flex-1 rounded-2xl border-app-primary-300/70 bg-app-primary-100/50 px-6 shadow-none', className)}>
            <div className="flex flex-row items-center justify-between" data-slot="card-header">
                <div className="space-y-1 text-app-primary-950">
                    <h1 className="text-2xl font-semibold tracking-wide uppercase sm:text-3xl">{page.name}</h1>
                    <p className="text-sm font-light tracking-wider sm:text-base">{page.description}</p>
                </div>
                <IconButtonExpandable
                    onClick={() => {
                        return router.visit(url, { replace: true });
                    }}
                    variant={buttonVariant}
                    size={'base'}
                    icon={buttonIcon}
                    label={buttonLabel}
                />
            </div>
            {children}
        </Card>
    );
}
