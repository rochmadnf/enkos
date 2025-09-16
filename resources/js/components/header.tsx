import AppLogo from './app-logo';
import { UserNav } from './user-nav';

export function Header() {
    return (
        <header className="border-grid w-full border-b">
            <div className="container-wrapper">
                <div className="container flex h-20 items-center justify-between px-4">
                    <AppLogo className="w-40" />
                    <UserNav />
                </div>
            </div>
        </header>
    );
}
