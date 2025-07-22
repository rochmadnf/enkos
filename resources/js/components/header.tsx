import AppLogo from './app-logo';
import { UserNav } from './user-nav';

export function Header() {
    return (
        <header className="relative flex h-[90px] max-h-24 flex-row items-center justify-between rounded-b-4xl border border-t-0 border-app-primary-300 bg-white px-6 py-4">
            <div className="flex w-36 items-center justify-center rounded-md">
                <AppLogo className="w-full" />
            </div>
            <UserNav />
        </header>
    );
}
