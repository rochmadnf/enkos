import { Input } from '@/components/input';
import { SearchIcon, XIcon } from 'lucide-react';
import { forwardRef, InputHTMLAttributes } from 'react';

export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    onReset?: () => void;
    showReset?: boolean;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({ onReset, showReset = false, className, ...props }, ref) => {
    return (
        <div className="relative">
            <Input ref={ref} isize="sm" className="peer ps-9 pe-9" placeholder="Cari: minimal 3 huruf..." type="search" {...props} />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <SearchIcon size={16} />
            </div>
            {showReset && onReset && (
                <button
                    className="absolute inset-y-0 end-0 flex h-full w-9 cursor-pointer items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-destructive focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Reset search"
                    type="button"
                    onClick={onReset}
                >
                    <XIcon size={16} aria-hidden="true" />
                </button>
            )}
        </div>
    );
});

SearchInput.displayName = 'SearchInput';
