import { getInitialName } from '@/lib/utils';
import { User as UserType } from '@/types';
import { Link } from '@inertiajs/react';
import { LogOut, User } from 'lucide-react';
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

interface UserNavProps {
    user: UserType;
}

export function UserNav({ user }: UserNavProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="inline-flex max-w-40 cursor-pointer items-center justify-center gap-x-2 rounded-full border border-slate-300/50 px-2 py-1.5 outline-0 transition duration-200 outline-none hover:border-slate-900/50 data-[state=open]:border-slate-900/50">
                    <Avatar className="size-9 rounded-full border border-slate-300/30 shadow shadow-gray-400">
                        <AvatarImage src={user.avatar} alt="Rochmad" />
                        <AvatarFallback className="rounded-full text-white">{getInitialName(user.name)}</AvatarFallback>
                    </Avatar>
                    <span className="truncate font-medium tracking-wide">{user.name}</span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 md:w-40" sideOffset={12} side="top">
                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild className="w-full cursor-pointer hover:bg-blue-100 hover:text-blue-500">
                        <Link href="#">
                            <User />
                            Profil
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="hover:bg-accent hover:text-accent-foreground w-full cursor-pointer">
                        <Link href={route('logout')} as="button" method="post">
                            <LogOut />
                            Keluar
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
