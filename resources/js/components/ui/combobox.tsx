'use client';

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Input } from './input';

export interface ComboboxOption {
	value: string;
	label: string;
	[key: string]: any;
}

export interface ComboboxProps
	extends Omit<React.ComponentProps<'input'>, 'onChange' | 'value'> {
	options: ComboboxOption[];
	value?: string;
	onChange?: (value: string, option?: ComboboxOption) => void;
	onSearchChange?: (search: string) => void;
	isLoading?: boolean;
	emptyMessage?: string;
	noResultsMessage?: string;
	searchPlaceholder?: string;
	onCreateNew?: (inputValue: string) => void;
	createNewLabel?: string;
}

const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>(
	(
		{
			options = [],
			value = '',
			onChange,
			onSearchChange,
			isLoading = false,
			emptyMessage = 'No options',
			noResultsMessage = 'No results found',
			searchPlaceholder = 'Search...',
			onCreateNew,
			createNewLabel = 'Create new',
			className,
			...props
		},
		ref
	) => {
		const [open, setOpen] = React.useState(false);
		const [search, setSearch] = React.useState('');
		const inputRef = React.useRef<HTMLInputElement>(null);

		const selectedOption = options.find((opt) => opt.value === value);
		const filteredOptions = options.filter((opt) =>
			opt.label.toLowerCase().includes(search.toLowerCase())
		);

		React.useEffect(() => {
			onSearchChange?.(search);
		}, [search, onSearchChange]);

		const handleSelect = (option: ComboboxOption) => {
			onChange?.(option.value, option);
			setSearch('');
			setOpen(false);
		};

		const handleCreateNew = () => {
			if (search.trim()) {
				onCreateNew?.(search.trim());
				setSearch('');
				setOpen(false);
			}
		};

		const hasNoResults = search.length > 0 && filteredOptions.length === 0;

		return (
			<PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
				<div className="relative">
					<PopoverPrimitive.Trigger asChild>
						<div className="relative w-full">
							<Input
								ref={inputRef}
								placeholder={searchPlaceholder}
								value={search || selectedOption?.label || ''}
								onChange={(e) => setSearch(e.target.value)}
								onClick={() => setOpen(true)}
								onFocus={() => setOpen(true)}
								className="pr-10"
								aria-expanded={open}
								aria-autocomplete="list"
								{...props}
							/>
							{(search || value) && (
								<button
									type="button"
									onClick={(e) => {
										e.stopPropagation();
										setSearch('');
										onChange?.('');
										inputRef.current?.focus();
									}}
									className="absolute right-8 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded"
									aria-label="Clear selection"
								>
									<XIcon className="size-4 text-muted-foreground" />
								</button>
							)}
							<ChevronsUpDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
						</div>
					</PopoverPrimitive.Trigger>

					<PopoverPrimitive.Portal>
						<PopoverPrimitive.Content
							align="start"
							sideOffset={4}
							className={cn(
								'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 w-[var(--radix-popover-trigger-width)] rounded-md border bg-popover shadow-md outline-none',
								'max-h-60 overflow-hidden overflow-y-auto'
							)}
						>
							<div className="space-y-1 p-2">
								{isLoading && (
									<div className="px-2 py-6 text-center text-sm text-muted-foreground">
										Loading...
									</div>
								)}

								{!isLoading && filteredOptions.length === 0 && search.length === 0 && (
									<div className="px-2 py-6 text-center text-sm text-muted-foreground">
										{emptyMessage}
									</div>
								)}

								{!isLoading && filteredOptions.map((option) => (
									<button
										key={option.value}
										type="button"
										onClick={() => handleSelect(option)}
										className={cn(
											'flex w-full items-center gap-2 rounded px-2 py-2 text-sm cursor-pointer hover:bg-accent',
											value === option.value && 'bg-accent'
										)}
									>
										<CheckIcon
											className={cn(
												'size-4 flex-shrink-0',
												value === option.value ? 'opacity-100' : 'opacity-0'
											)}
										/>
										<span className="flex-1 text-left">{option.label}</span>
									</button>
								))}

								{!isLoading && hasNoResults && onCreateNew && (
									<button
										type="button"
										onClick={handleCreateNew}
										className="flex w-full items-center gap-2 rounded px-2 py-2 text-sm cursor-pointer hover:bg-accent text-primary font-medium"
									>
										<span className="text-lg">+</span>
										<span className="flex-1 text-left">
											{createNewLabel}: "{search}"
										</span>
									</button>
								)}

								{!isLoading && hasNoResults && !onCreateNew && (
									<div className="px-2 py-2 text-center text-sm text-muted-foreground">
										{noResultsMessage}
									</div>
								)}
							</div>
						</PopoverPrimitive.Content>
					</PopoverPrimitive.Portal>
				</div>
			</PopoverPrimitive.Root>
		);
	}
);

Combobox.displayName = 'Combobox';

export { Combobox };
