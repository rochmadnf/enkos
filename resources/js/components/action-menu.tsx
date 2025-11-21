import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { EllipsisIcon, LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface ActionMenuItem {
    icon: LucideIcon;
    label: string;
    onClick?: () => void;
}

interface ActionMenuProps {
    items: ActionMenuItem[];
    label?: string;
    triggerIcon?: ReactNode;
}

export function ActionMenu({ items, label = 'Lainnya', triggerIcon }: ActionMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className="rounded-none border-app-primary-300 text-app-primary-900 shadow-none first:rounded-s-md last:rounded-e-md hover:border-app-primary-500 hover:bg-app-primary-500 hover:text-white focus-visible:z-10 focus-visible:border-app-primary-500 focus-visible:ring-app-primary-300/50"
                    variant="outline"
                    size="icon"
                    aria-label="Menu"
                >
                    {triggerIcon ?? <EllipsisIcon size={16} aria-hidden="true" />}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className="text-xs text-app-primary-950 select-none">{label}</DropdownMenuLabel>
                {items.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <DropdownMenuItem
                            key={index}
                            className="group w-full cursor-pointer text-app-primary-950 focus:bg-app-primary-100/90 focus:text-app-primary-600"
                            onClick={item.onClick}
                        >
                            <Icon className="text-app-primary-950 group-hover:text-app-primary-600" />
                            {item.label}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
