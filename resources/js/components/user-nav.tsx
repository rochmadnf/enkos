import { USER_NAV_ITEMS, UserNavItemProps } from '@/config/nav';
import { getInitialName } from '@/lib/utils';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function UserNav() {
    const {
        auth: { user },
    } = usePage<SharedData>().props;

    const buttonRef = useRef<HTMLButtonElement>(null);
    const nameRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        gsap.set(buttonRef.current, { width: 54 });
        gsap.set(nameRef.current, { opacity: 0, width: 0 });
    }, []);

    const handleOpen = () => {
        // Saat dropdown terbuka → tombol melebar & nama muncul
        gsap.to(buttonRef.current, {
            width: '160px', // bisa diubah sesuai panjang nama
            duration: 0.3,
            ease: 'power2.out',
        });
        gsap.to(nameRef.current, {
            opacity: 1,
            width: 'auto',
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    const handleClose = () => {
        gsap.to(buttonRef.current, {
            width: 54,
            duration: 0.3,
            ease: 'power2.inOut',
        });
        gsap.to(nameRef.current, {
            opacity: 0,
            width: 0,
            duration: 0.4,
            ease: 'power2.inOut',
        });
    };

    return (
        <DropdownMenu onOpenChange={(open) => (open ? handleOpen() : handleClose())}>
            <DropdownMenuTrigger asChild>
                <button
                    ref={buttonRef}
                    className="inline-flex items-center overflow-hidden rounded-full border border-app-primary-300/50 bg-app-primary-100 px-2 py-2 text-app-primary-950 transition-all outline-none hover:border-app-primary-300 data-[state=open]:gap-x-2"
                >
                    <Avatar className="size-9 rounded-full">
                        <AvatarImage src={user.avatar ?? '#'} alt="Rochmad Labs" />
                        <AvatarFallback className="rounded-full text-white">{getInitialName(user.name)}</AvatarFallback>
                    </Avatar>
                    <span ref={nameRef} className="truncate font-medium tracking-wide whitespace-nowrap">
                        {user.name}
                    </span>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-36 border-app-primary-300 md:w-40" sideOffset={12} side="top">
                <DropdownMenuLabel className="text-app-primary-950">Akun Saya</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-app-primary-300" />
                <DropdownMenuGroup>
                    {USER_NAV_ITEMS.map((navItem) => (
                        <UserNavItem key={navItem.id} {...navItem} />
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function UserNavItem({ href, icon, label, method = 'get', asButton = false, separator = false }: Omit<UserNavItemProps, 'id'>) {
    const Icon = icon;
    return (
        <>
            <DropdownMenuItem
                asChild
                className="group w-full cursor-pointer text-app-primary-950 focus:bg-app-primary-100/90 focus:text-app-primary-600"
            >
                <Link href={href} as={asButton ? 'button' : 'a'} method={method}>
                    {Icon ? <Icon className="text-app-primary-950 group-hover:text-app-primary-600" /> : null}
                    {label}
                </Link>
            </DropdownMenuItem>
            {separator ? <DropdownMenuSeparator className="bg-app-primary-300" /> : null}
        </>
    );
}
