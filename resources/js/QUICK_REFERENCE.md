# Quick Reference Guide - Reusable Components

## Import Patterns

### ✅ Recommended (using barrel exports)

```tsx
import { Pagination, TableLoadingState, TableEmptyState } from '@/components/table';
import { FormPopover, DeleteButton } from '@/components/form';
import { PageHeader, ActionMenu, SearchInput } from '@/components';
import { usePagination } from '@/hooks/use-pagination';
```

### ❌ Avoid (direct imports when barrel exists)

```tsx
import { Pagination } from '@/components/table/pagination';
import { TableLoadingState } from '@/components/table/table-states';
```

## Common Patterns

### 1. Index Page with Pagination

```tsx
import { PageHeader, ActionMenu } from '@/components';
import { Pagination, TableLoadingState, TableEmptyState } from '@/components/table';
import { usePagination } from '@/hooks/use-pagination';

export default function ItemsIndex() {
    const {
        items: { data: rows, meta },
    } = usePage<PageProps>();

    const { pageState, perPageState, setCurrentPage, setShowDataPerpage, isLoading } = usePagination(meta, {
        routeName: 'items.index',
        onlyProps: ['items'],
        defaultPerPage: 10,
    });

    const menuItems = [
        { icon: FilterIcon, label: 'Filter', onClick: handleFilter },
        { icon: ExportIcon, label: 'Export', onClick: handleExport },
    ];

    return (
        <div className="space-y-6 p-6">
            <PageHeader actions={<ActionMenu items={menuItems} />} />

            <section className="rounded-lg border border-app-primary-300">
                <table className="w-full">
                    <tbody>
                        {isLoading ? (
                            <TableLoadingState colSpan={5} />
                        ) : rows.length === 0 ? (
                            <TableEmptyState colSpan={5} />
                        ) : (
                            rows.map((row) => <tr key={row.id}>...</tr>)
                        )}
                    </tbody>
                </table>

                <Pagination
                    meta={meta}
                    pageState={pageState}
                    perPageState={perPageState}
                    perPageList={[10, 25, 50]}
                    onPageChange={setCurrentPage}
                    onPerPageChange={setShowDataPerpage}
                />
            </section>
        </div>
    );
}
```

### 2. Add/Edit Form with Popover

```tsx
import { FormPopover } from '@/components/form';
import { FormInput } from '@/components/form/input';

function AddButton() {
    const [open, setOpen] = useState(false);
    const form = useForm({ name: '', email: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post(route('items.store'), {
            onSuccess: () => {
                form.reset();
                setOpen(false);
            },
        });
    };

    return (
        <FormPopover
            open={open}
            onOpenChange={setOpen}
            trigger={<Button>Add Item</Button>}
            title="Add New Item"
            description="Fill in the details below"
            onSubmit={handleSubmit}
            onCancel={() => {
                form.reset();
                setOpen(false);
            }}
            isProcessing={form.processing}
        >
            <FormInput
                label="Name"
                name="name"
                value={form.data.name}
                onChange={(e) => form.setData('name', e.target.value)}
                error={form.errors.name}
            />
        </FormPopover>
    );
}
```

### 3. Search Functionality

```tsx
import { SearchInput } from '@/components';
import { useDebouncedCallback } from 'use-debounce';

function SearchBar() {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [showReset, setShowReset] = useState(false);
    const inputRef = useRef(null);

    const debouncedSearch = useDebouncedCallback((value: string) => {
        if (value.length >= 3) {
            setSearchKeyword(value);
            setShowReset(true);
            // Trigger search
        } else {
            setSearchKeyword('');
            setShowReset(false);
        }
    }, 800);

    const handleReset = () => {
        setSearchKeyword('');
        setShowReset(false);
        if (inputRef.current) inputRef.current.value = '';
    };

    return (
        <SearchInput
            ref={inputRef}
            defaultValue={searchKeyword}
            onChange={(e) => debouncedSearch(e.target.value)}
            onReset={handleReset}
            showReset={showReset}
        />
    );
}
```

### 4. Action Menu

```tsx
import { ActionMenu } from '@/components';

const menuItems = [
    {
        icon: FilterIcon,
        label: 'Filter',
        onClick: () => console.log('Filter'),
    },
    {
        icon: ExportIcon,
        label: 'Export',
        onClick: () => console.log('Export'),
    },
];

<ActionMenu items={menuItems} label="Actions" />;
```

## Component Props Quick Reference

### Pagination

```tsx
interface PaginationProps {
    meta: PaginationMetaProps | undefined;
    pageState: number;
    perPageState: number;
    perPageList: number[]; // e.g., [10, 25, 50, 100]
    onPageChange: (page: number) => void;
    onPerPageChange: (perPage: number) => void;
    showTotal?: boolean; // default: true
}
```

### usePagination

```tsx
interface UsePaginationOptions {
    routeName: string;               // e.g., 'items.index'
    onlyProps?: string[];            // e.g., ['items']
    defaultPerPage?: number;         // default: 5
    additionalParams?: Record<string, any>;
}

// Returns:
{
    pageState: number;
    perPageState: number;
    setPageState: (page: number) => void;
    setPerPageState: (perPage: number) => void;
    setShowDataPerpage: (sum: number) => void;
    setCurrentPage: (pageNumber: number) => number;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    submitPagination: (params: object) => void;
}
```

### FormPopover

```tsx
interface FormPopoverProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    trigger: ReactNode;
    title: string;
    description?: string;
    onSubmit: FormEventHandler;
    onCancel: () => void;
    children: ReactNode;
    submitLabel?: string; // default: 'Simpan'
    cancelLabel?: string; // default: 'Batal'
    isProcessing?: boolean; // default: false
    side?: 'top' | 'right' | 'bottom' | 'left'; // default: 'left'
    align?: 'start' | 'center' | 'end'; // default: 'start'
    sideOffset?: number;
    className?: string;
    disabled?: boolean;
}
```

### PageHeader

```tsx
interface PageHeaderProps {
    className?: string;
    title?: string; // defaults to page.name
    description?: string; // defaults to page.description
    actions?: ReactNode;
}
```

### ActionMenu

```tsx
interface ActionMenuItem {
    icon: LucideIcon;
    label: string;
    onClick?: () => void;
}

interface ActionMenuProps {
    items: ActionMenuItem[];
    label?: string; // default: 'Lainnya'
    triggerIcon?: ReactNode;
}
```

### SearchInput

```tsx
interface SearchInputProps extends InputHTMLAttributes {
    onReset?: () => void;
    showReset?: boolean; // default: false
}
```

### Table States

```tsx
// TableLoadingState
interface TableLoadingStateProps {
    colSpan: number;
    message?: string; // default: 'Memuat data...'
}

// TableEmptyState
interface TableEmptyStateProps {
    colSpan: number;
    message?: string; // default: 'Belum ada data...'
    icon?: ReactNode; // default: DatabaseIcon
}
```

## Tips

1. **Always use barrel exports** for cleaner imports
2. **Leverage usePagination hook** instead of managing state manually
3. **Consistent naming**: Use `items`, `meta`, `rows` for clarity
4. **Error handling**: Always handle form errors in FormPopover
5. **Loading states**: Use TableLoadingState during data fetching
6. **Type safety**: All components are fully typed - use them!

## Common Mistakes to Avoid

❌ **Don't** manage pagination state manually

```tsx
const [page, setPage] = useState(1);
const [perPage, setPerPage] = useState(10);
// ... manual router.get calls
```

✅ **Do** use the usePagination hook

```tsx
const { pageState, perPageState, setCurrentPage, setShowDataPerpage } = usePagination(meta, { routeName: 'items.index' });
```

❌ **Don't** create inline loading states

```tsx
{
    loading && <div>Loading...</div>;
}
```

✅ **Do** use TableLoadingState

```tsx
{
    isLoading && <TableLoadingState colSpan={5} />;
}
```

❌ **Don't** duplicate pagination UI

```tsx
// Copy-paste pagination from another file
```

✅ **Do** use Pagination component

```tsx
<Pagination {...props} />
```
