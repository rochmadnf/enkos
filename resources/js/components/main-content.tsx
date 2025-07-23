import { router } from '@inertiajs/react';
import { VariantProps } from 'class-variance-authority';
import { PropsWithChildren, ReactNode } from 'react';
import { IconButtonExpandable, iconButtonExpandableVariants } from './animate/button-expandable';
import { Card } from './ui/card';

export interface MainContent {
    buttonVariant?: VariantProps<typeof iconButtonExpandableVariants>['variant'];
    buttonIcon: ReactNode;
    buttonLabel: string;
    contentName: string;
    contentDesc: string;
    url: string;
}

export function MainContent({
    buttonVariant = 'default',
    buttonIcon,
    buttonLabel,
    contentName,
    contentDesc,
    url,
    children,
}: PropsWithChildren<MainContent>) {
    return (
        <Card className="min-h-full flex-1 rounded-2xl border-app-primary-300/70 px-6 shadow-none">
            <div className="flex flex-row items-center justify-between" data-slot="card-header">
                <div className="space-y-1">
                    <h1 className="text-3xl font-semibold tracking-wide">{contentName}</h1>
                    <p className="font-light tracking-wider text-slate-900">{contentDesc}</p>
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
