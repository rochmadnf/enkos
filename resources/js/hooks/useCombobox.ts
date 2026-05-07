import { useCallback, useState } from 'react';
import { ComboboxOption } from '@/components/ui/combobox';

interface UseComboboxOptions {
	onSearch?: (query: string) => Promise<ComboboxOption[]>;
	onCreate?: (label: string) => Promise<ComboboxOption | void>;
	onCreateConfirm?: (label: string) => Promise<boolean>;
}

export function useCombobox({
	onSearch,
	onCreate,
	onCreateConfirm,
}: UseComboboxOptions) {
	const [options, setOptions] = useState<ComboboxOption[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSearch = useCallback(
		async (query: string) => {
			if (!onSearch) return;

			try {
				setIsLoading(true);
				setError(null);
				const results = await onSearch(query);
				setOptions(results);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Search failed');
				setOptions([]);
			} finally {
				setIsLoading(false);
			}
		},
		[onSearch]
	);

	const handleCreateNew = useCallback(
		async (label: string) => {
			if (!onCreate) return;

			// Ask for confirmation if provided
			if (onCreateConfirm) {
				const confirmed = await onCreateConfirm(label);
				if (!confirmed) return;
			}

			try {
				setIsLoading(true);
				setError(null);
				const newOption = await onCreate(label);
				if (newOption) {
					setOptions((prev) => [...prev, newOption]);
				}
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to create item');
			} finally {
				setIsLoading(false);
			}
		},
		[onCreate, onCreateConfirm]
	);

	const reset = useCallback(() => {
		setOptions([]);
		setError(null);
		setIsLoading(false);
	}, []);

	return {
		options,
		isLoading,
		error,
		handleSearch,
		handleCreateNew,
		setOptions,
		reset,
	};
}
