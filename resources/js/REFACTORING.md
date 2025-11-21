# Code Refactoring Documentation

This document describes the refactoring done to improve code reusability in the `resources/js` folder.

## New Reusable Components Created

### 1. **Pagination Component** (`components/table/pagination.tsx`)

A reusable pagination component that handles:

- Page navigation (first, previous, next, last)
- Page selection dropdown
- Per-page items selector
- Total items display

**Usage:**

```tsx
<Pagination
    meta={meta}
    pageState={pageState}
    perPageState={perPageState}
    perPageList={PER_PAGE_LIST}
    onPageChange={setCurrentPage}
    onPerPageChange={setShowDataPerpage}
/>
```

### 2. **Table State Components** (`components/table/table-states.tsx`)

Reusable loading and empty state components for tables:

- `TableLoadingState` - Shows loading spinner with message
- `TableEmptyState` - Shows empty state icon with message

**Usage:**

```tsx
{isLoading ? (
    <TableLoadingState colSpan={8} />
) : rows.length === 0 ? (
    <TableEmptyState colSpan={8} />
) : (
    // ... render data
)}
```

### 3. **Page Header Component** (`components/page-header.tsx`)

A standardized page header with title, description, and optional actions:

**Usage:**

```tsx
<PageHeader
    actions={
        <ButtonAdd />
        <ActionMenu items={menuItems} />
    }
/>
```

### 4. **Action Menu Component** (`components/action-menu.tsx`)

A dropdown menu for page actions (Filter, Export, etc.):

**Usage:**

```tsx
const actionMenuItems = [
    { icon: FunnelPlusIcon, label: 'Filter', onClick: () => {} },
    { icon: FileSymlinkIcon, label: 'Ekspor', onClick: () => {} },
];

<ActionMenu items={actionMenuItems} />;
```

### 5. **Form Popover Component** (`components/form/form-popover.tsx`)

A reusable popover wrapper for forms with consistent structure:

- Auto-handles open/close state
- Prevents outside clicks during form editing
- Standardized submit/cancel buttons
- Loading state handling

**Usage:**

```tsx
<FormPopover
    open={open}
    onOpenChange={setOpen}
    trigger={<Button>...</Button>}
    title="Form Title"
    description="Form description"
    onSubmit={handleSubmit}
    onCancel={handleCancel}
    isProcessing={form.processing}
>
    {/* Form inputs */}
</FormPopover>
```

### 6. **Search Input Component** (`components/search-input.tsx`)

A search input with integrated search icon and optional reset button:

**Usage:**

```tsx
<SearchInput
    ref={inputRef}
    defaultValue={searchKeyword}
    onChange={(e) => debouncedSearch(e.target.value)}
    onReset={resetSearch}
    showReset={showResetButton}
/>
```

### 7. **usePagination Hook** (`hooks/use-pagination.tsx`)

A custom hook that encapsulates pagination logic:

- State management for page and per-page
- Automatic URL parameter handling
- Loading state management
- Configurable route and props

**Usage:**

```tsx
const { pageState, perPageState, setCurrentPage, setShowDataPerpage, isLoading, submitPagination } = usePagination(meta, {
    routeName: 'resource.index',
    onlyProps: ['resources'],
    defaultPerPage: 10,
});
```

## Refactored Pages

### Gas Cylinder Index (`pages/gas-cylinder/index.tsx`)

**Before:** 250+ lines with inline pagination, state management, and action menus
**After:** ~160 lines using reusable components

**Changes:**

- Uses `PageHeader` for consistent header layout
- Uses `ActionMenu` for dropdown actions
- Uses `Pagination` for pagination controls
- Uses `TableLoadingState` and `TableEmptyState`
- Uses `usePagination` hook for state management

### Gas Cylinder Partials

**`_btn-add.tsx` and `_btn-edit.tsx`:**

- Now use `FormPopover` component
- Reduced code duplication
- Consistent form structure

### Gas Location DataTable (`pages/gas-location/components/datatable.tsx`)

**Before:** 220+ lines with duplicate pagination logic
**After:** ~150 lines

**Changes:**

- Uses `SearchInput` component
- Uses `Pagination` component
- Uses `usePagination` hook
- Cleaner, more maintainable code

## Benefits

1. **DRY Principle**: Eliminated code duplication across components
2. **Consistency**: All pages now use the same UI patterns
3. **Maintainability**: Changes to pagination/search behavior only need to be made once
4. **Type Safety**: All components are fully typed with TypeScript
5. **Reusability**: Components can be easily reused in new pages
6. **Testing**: Easier to test isolated components
7. **Performance**: Shared logic reduces bundle size

## Migration Guide

To use these components in new pages:

1. **For pagination:**

    ```tsx
    import { Pagination } from '@/components/table/pagination';
    import { usePagination } from '@/hooks/use-pagination';

    const { pageState, perPageState, setCurrentPage, setShowDataPerpage } = usePagination(meta, { routeName: 'your.route', onlyProps: ['data'] });

    <Pagination
        meta={meta}
        pageState={pageState}
        perPageState={perPageState}
        perPageList={[5, 10, 25, 50]}
        onPageChange={setCurrentPage}
        onPerPageChange={setShowDataPerpage}
    />;
    ```

2. **For table states:**

    ```tsx
    import { TableLoadingState, TableEmptyState } from '@/components/table/table-states';

    {isLoading ? (
        <TableLoadingState colSpan={columnCount} />
    ) : rows.length === 0 ? (
        <TableEmptyState colSpan={columnCount} />
    ) : (
        // render data
    )}
    ```

3. **For page headers:**

    ```tsx
    import { PageHeader } from '@/components/page-header';

    <PageHeader actions={<YourActions />} />;
    ```

## Future Improvements

- Create a `DataTable` wrapper component for consistent table styling
- Add search functionality to `usePagination` hook
- Create reusable card list component for grid layouts
- Add sorting capabilities to table headers
- Create form validation helpers
