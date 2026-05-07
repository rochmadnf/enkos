import { ComboboxWithDialog } from '@/components/custom/combobox-with-dialog';
import { FormCombobox } from '@/components/form/combobox';
import { ComboboxOption } from '@/components/ui/combobox';
import { useCombobox } from '@/hooks/useCombobox';
import axios from 'axios';
import { useState } from 'react';

/**
 * Example 1: Basic Usage with Static Data
 * Simple combobox with predefined options
 */
export function BasicComboboxExample() {
    const [value, setValue] = useState('');

    const options: ComboboxOption[] = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
    ];

    return <FormCombobox name="category" label="Select a Category" value={value} onChange={(val) => setValue(val)} options={options} required />;
}

/**
 * Example 2: With Search and API Integration
 * Fetches data from API as user types
 */
export function SearchableComboboxExample() {
    const [value, setValue] = useState('');
    const { options, isLoading, handleSearch } = useCombobox({
        onSearch: async (query) => {
            if (!query.trim()) return [];

            const response = await axios.get('/api/search', {
                params: { q: query },
            });
            return response.data;
        },
    });

    return (
        <FormCombobox
            name="location"
            label="Select Location"
            value={value}
            onChange={(val) => setValue(val)}
            options={options}
            isLoading={isLoading}
            onSearchChange={handleSearch}
            placeholder="Type to search..."
            required
        />
    );
}

/**
 * Example 3: With Create New Option
 * User can create new items when search returns no results
 */
export function ComboboxWithCreateExample() {
    const [value, setValue] = useState('');
    const [selectedOption, setSelectedOption] = useState<ComboboxOption | null>(null);

    const { options, isLoading, handleSearch, handleCreateNew, setOptions } = useCombobox({
        onSearch: async (query) => {
            if (!query.trim()) return [];

            const response = await axios.get('/api/gas-locations', {
                params: { search: query },
            });
            return response.data;
        },
        onCreate: async (label) => {
            const response = await axios.post('/api/gas-locations', {
                name: label,
            });
            return response.data;
        },
    });

    return (
        <FormCombobox
            name="gasLocation"
            label="Gas Location"
            value={value}
            onChange={(val, opt) => {
                setValue(val);
                setSelectedOption(opt || null);
            }}
            options={options}
            isLoading={isLoading}
            onSearchChange={handleSearch}
            onCreateNew={async (inputValue) => {
                const newOption = await handleCreateNew(inputValue);
                if (newOption) {
                    // If you need to access the created option, you can get it from state
                    setOptions((prev) => [...prev, newOption]);
                }
            }}
            placeholder="Search or create location..."
            createNewLabel="Create Location"
            required
        />
    );
}

/**
 * Example 4: With Dialog Confirmation
 * Shows a confirmation dialog before creating new items
 */
export function ComboboxWithConfirmationExample() {
    const [value, setValue] = useState('');

    return (
        <ComboboxWithDialog
            name="category"
            label="Category"
            value={value}
            onChange={(val) => setValue(val)}
            options={[
                { value: '1', label: 'Category 1' },
                { value: '2', label: 'Category 2' },
            ]}
            onCreateNew={async (label) => {
                const response = await axios.post('/api/categories', {
                    name: label,
                });
                return response.data;
            }}
            createConfirmTitle="Create New Category?"
            createConfirmDescription="This will create a new category that can be used in future transactions."
            createConfirmAction="Yes, Create"
            createConfirmCancel="Cancel"
        />
    );
}

/**
 * Example 5: Complete Form Integration
 * Full example with both search and create in a real form
 */
export function CompleteFormExample() {
    const [formData, setFormData] = useState({
        location: '',
        category: '',
    });

    const {
        options: locations,
        isLoading: loadingLocations,
        handleSearch: searchLocations,
    } = useCombobox({
        onSearch: async (query) => {
            const response = await axios.get('/api/gas-locations', {
                params: { search: query },
            });
            return response.data;
        },
        onCreate: async (label) => {
            const response = await axios.post('/api/gas-locations', { name: label });
            return response.data;
        },
    });

    const {
        options: categories,
        isLoading: loadingCategories,
        handleSearch: searchCategories,
    } = useCombobox({
        onSearch: async (query) => {
            const response = await axios.get('/api/categories', {
                params: { search: query },
            });
            return response.data;
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Submit form data
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <FormCombobox
                name="location"
                label="Location"
                value={formData.location}
                onChange={(val) => setFormData((prev) => ({ ...prev, location: val }))}
                options={locations}
                isLoading={loadingLocations}
                onSearchChange={searchLocations}
                onCreateNew={async (input) => {
                    const result = await useCombobox({
                        onCreate: async (label) => {
                            const response = await axios.post('/api/gas-locations', { name: label });
                            return response.data;
                        },
                    }).handleCreateNew(input);
                }}
                placeholder="Search or create location..."
                required
            />

            <FormCombobox
                name="category"
                label="Category"
                value={formData.category}
                onChange={(val) => setFormData((prev) => ({ ...prev, category: val }))}
                options={categories}
                isLoading={loadingCategories}
                onSearchChange={searchCategories}
                placeholder="Search category..."
                required
            />

            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
}
