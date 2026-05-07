# Combobox Component Documentation

A reusable combobox component with search, filtering, and optional create-new functionality. Fully typed with TypeScript and styled with Tailwind CSS.

## Components

### 1. **UI Components**

#### `Combobox` (`@/components/ui/combobox`)

The core searchable dropdown component built on Radix UI Popover.

**Features:**

- Searchable input field
- Dropdown with filtered results
- Clear button to reset selection
- Optional "Create New" button when no results found
- Loading state support
- Accessible (keyboard navigation, ARIA labels)

**Props:**

```typescript
interface ComboboxProps {
    options: ComboboxOption[]; // Array of selectable options
    value?: string; // Currently selected value
    onChange?: (value, option) => void; // Called when selection changes
    onSearchChange?: (search) => void; // Called when search input changes
    isLoading?: boolean; // Show loading state
    emptyMessage?: string; // Message when no options available
    noResultsMessage?: string; // Message when search has no results
    searchPlaceholder?: string; // Placeholder text for input
    onCreateNew?: (inputValue) => void; // Called when user clicks create button
    createNewLabel?: string; // Label for create button
    // ... standard input props
}

interface ComboboxOption {
    value: string;
    label: string;
    [key: string]: any; // Additional custom fields
}
```

**Usage:**

```typescript
import { Combobox } from '@/components/ui/combobox';

function MyComponent() {
  const [value, setValue] = useState('');
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ];

  return (
    <Combobox
      options={options}
      value={value}
      onChange={(val) => setValue(val)}
      searchPlaceholder="Search..."
    />
  );
}
```

#### `ComboboxWithDialog` (`@/components/custom/combobox-with-dialog`)

Wraps Combobox with an AlertDialog for confirming new item creation.

**Props:**

```typescript
interface ComboboxWithDialogProps extends ComboboxProps {
    onCreateNew?: (inputValue) => Promise<ComboboxOption | void>;
    createConfirmTitle?: string; // Dialog title
    createConfirmDescription?: string; // Dialog description
    createConfirmAction?: string; // Confirm button text
    createConfirmCancel?: string; // Cancel button text
}
```

**Usage:**

```typescript
import { ComboboxWithDialog } from '@/components/custom/combobox-with-dialog';

<ComboboxWithDialog
  options={options}
  value={value}
  onChange={(val) => setValue(val)}
  onCreateNew={async (label) => {
    const res = await api.createLocation(label);
    return res.data;
  }}
  createConfirmTitle="Create new location?"
/>
```

### 2. **Form Components**

#### `FormCombobox` (`@/components/form/combobox`)

Wrapper component that adds label, error message, and form integration.

**Props:**

```typescript
interface FormComboboxProps extends ComboboxProps {
    label: string; // Label text
    error?: string; // Error message to display
    required?: boolean; // Show required indicator
    helperText?: ReactNode; // Helper text below input
}
```

**Usage:**

```typescript
import { FormCombobox } from '@/components/form/combobox';

<FormCombobox
  name="location"
  label="Select Location"
  value={value}
  onChange={(val) => setValue(val)}
  options={options}
  error={errors?.location}
  required
  helperText="Choose where the gas cylinder is located"
/>
```

### 3. **Hooks**

#### `useCombobox` (`@/hooks/useCombobox`)

Hook for managing search results and create new item functionality.

**Features:**

- Handles API search calls
- Manages loading and error states
- Handles item creation with optional confirmation
- State management for options

**Props:**

```typescript
interface UseComboboxOptions {
    onSearch?: (query: string) => Promise<ComboboxOption[]>;
    onCreate?: (label: string) => Promise<ComboboxOption | void>;
    onCreateConfirm?: (label: string) => Promise<boolean>;
}
```

**Returns:**

```typescript
{
  options: ComboboxOption[];              // Current options list
  isLoading: boolean;                     // Loading state
  error: string | null;                   // Error message
  handleSearch: (query) => Promise<void>; // Search function
  handleCreateNew: (label) => Promise<void>; // Create function
  setOptions: (options) => void;          // Directly set options
  reset: () => void;                      // Reset all state
}
```

**Usage:**

```typescript
import { useCombobox } from '@/hooks/useCombobox';
import axios from 'axios';

function MyForm() {
  const { options, isLoading, handleSearch } = useCombobox({
    onSearch: async (query) => {
      if (!query.trim()) return [];
      const res = await axios.get('/api/search', { params: { q: query } });
      return res.data;
    },
    onCreate: async (label) => {
      const res = await axios.post('/api/items', { name: label });
      return res.data;
    },
  });

  return (
    <FormCombobox
      name="item"
      label="Select Item"
      options={options}
      isLoading={isLoading}
      onSearchChange={handleSearch}
      onCreateNew={async (input) => {
        // Handle creation
      }}
    />
  );
}
```

## Complete Examples

### Example 1: Basic Selection (No Search)

```typescript
import { FormCombobox } from '@/components/form/combobox';
import { useState } from 'react';

export function UserRole() {
  const [role, setRole] = useState('');

  return (
    <FormCombobox
      name="role"
      label="User Role"
      value={role}
      onChange={(val) => setRole(val)}
      options={[
        { value: 'admin', label: 'Administrator' },
        { value: 'user', label: 'Regular User' },
        { value: 'guest', label: 'Guest' },
      ]}
      required
    />
  );
}
```

### Example 2: Searchable with API

```typescript
import { FormCombobox } from '@/components/form/combobox';
import { useCombobox } from '@/hooks/useCombobox';
import axios from 'axios';
import { useState } from 'react';

export function LocationSelector() {
  const [value, setValue] = useState('');
  const { options, isLoading, handleSearch } = useCombobox({
    onSearch: async (query) => {
      if (!query.trim()) return [];
      const { data } = await axios.get('/api/gas-locations', {
        params: { search: query },
      });
      return data;
    },
  });

  return (
    <FormCombobox
      name="location_id"
      label="Gas Location"
      value={value}
      onChange={(val) => setValue(val)}
      options={options}
      isLoading={isLoading}
      onSearchChange={handleSearch}
      placeholder="Type location name..."
      required
    />
  );
}
```

### Example 3: With Create New (API Integration)

```typescript
import { ComboboxWithDialog } from '@/components/custom/combobox-with-dialog';
import axios from 'axios';
import { useState } from 'react';

export function LocationWithCreate() {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState<ComboboxOption[]>([]);

  return (
    <ComboboxWithDialog
      name="location_id"
      label="Location"
      value={value}
      onChange={(val, opt) => {
        setValue(val);
        if (opt) {
          // Update options list with new option if created
          setOptions((prev) => {
            const exists = prev.find((o) => o.value === opt.value);
            return exists ? prev : [...prev, opt];
          });
        }
      }}
      options={options}
      onCreateNew={async (label) => {
        const { data } = await axios.post('/api/gas-locations', {
          name: label,
        });
        return data; // Should return { value: string, label: string }
      }}
      createConfirmTitle="Create new location?"
      createConfirmDescription={`Create a new location named "${value}"?`}
    />
  );
}
```

### Example 4: Search with Create Option

```typescript
import { FormCombobox } from '@/components/form/combobox';
import { useCombobox } from '@/hooks/useCombobox';
import axios from 'axios';
import { useState } from 'react';

export function CategorySearchWithCreate() {
  const [value, setValue] = useState('');
  const { options, isLoading, handleSearch, handleCreateNew, setOptions } =
    useCombobox({
      onSearch: async (query) => {
        if (!query.trim()) return [];
        const { data } = await axios.get('/api/categories', {
          params: { search: query },
        });
        return data;
      },
      onCreate: async (label) => {
        const { data } = await axios.post('/api/categories', {
          name: label,
        });
        return data;
      },
    });

  const handleCreate = async (input: string) => {
    const newOption = await handleCreateNew(input);
    if (newOption) {
      setOptions((prev) => [...prev, newOption]);
      setValue(newOption.value);
    }
  };

  return (
    <FormCombobox
      name="category_id"
      label="Category"
      value={value}
      onChange={(val) => setValue(val)}
      options={options}
      isLoading={isLoading}
      onSearchChange={handleSearch}
      onCreateNew={handleCreate}
      createNewLabel="Create Category"
      placeholder="Search or create category..."
      required
    />
  );
}
```

## Integration with Forms (Inertia)

### With FormData/useForm

```typescript
import { FormCombobox } from '@/components/form/combobox';
import { useForm } from '@inertiajs/react';

export function CreateTransaction() {
  const { data, setData, post, errors } = useForm({
    location_id: '',
    category_id: '',
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      post('/transactions');
    }}>
      <FormCombobox
        name="location_id"
        label="Location"
        value={data.location_id}
        onChange={(val) => setData('location_id', val)}
        options={/* ... */}
        error={errors.location_id}
        required
      />
      {/* ... other fields ... */}
    </form>
  );
}
```

## Styling & Customization

All components use Tailwind CSS and follow your project's design system. Key CSS classes:

- `.bg-popover` - Dropdown background
- `.text-popover-foreground` - Dropdown text color
- `.hover:bg-accent` - Hover state for options
- `.bg-accent` - Selected option background

Customize by modifying the component files directly or override Tailwind config variables.

## Accessibility

- Keyboard navigation (Arrow keys, Enter, Escape)
- ARIA labels and roles
- Focus management
- Screen reader friendly

## API Expected Response

For search endpoints, return array of objects:

```typescript
[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
];
```

For create endpoints, return the created option:

```typescript
{
  value: "3",
  label: "Newly Created Option",
  // ... any additional fields
}
```

## Common Patterns

### Pre-populate Options

```typescript
useEffect(() => {
    setOptions([
        { value: '1', label: 'Default Option' },
        // ... more options
    ]);
}, []);
```

### Dependent Combos (Load second based on first selection)

```typescript
useEffect(() => {
    if (selectedLocation) {
        handleSearch(''); // Reset search
        // Load categories for this location
    }
}, [selectedLocation]);
```

### Clear Selection

```typescript
const handleClear = () => {
    setValue('');
    setOptions([]);
};
```
