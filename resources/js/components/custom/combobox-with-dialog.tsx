import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Combobox, ComboboxOption, ComboboxProps } from '@/components/ui/combobox';
import { useCallback, useState } from 'react';

interface ComboboxWithDialogProps extends Omit<ComboboxProps, 'onCreateNew'> {
    onCreateNew?: (inputValue: string) => Promise<ComboboxOption | void>;
    createConfirmTitle?: string;
    createConfirmDescription?: string;
    createConfirmAction?: string;
    createConfirmCancel?: string;
}

export function ComboboxWithDialog({
    onCreateNew,
    createConfirmTitle = 'Create new item?',
    createConfirmDescription,
    createConfirmAction = 'Create',
    createConfirmCancel = 'Cancel',
    ...props
}: ComboboxWithDialogProps) {
    const [pendingCreation, setPendingCreation] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleCreateNew = useCallback(async (inputValue: string) => {
        setPendingCreation(inputValue);
    }, []);

    const handleConfirmCreate = useCallback(async () => {
        if (!pendingCreation || !onCreateNew) return;

        try {
            setIsCreating(true);
            const newOption = await onCreateNew(pendingCreation);
            if (newOption) {
                // Add new option to list
                const currentOptions = props.options || [];
                const updatedOptions = [...currentOptions, newOption];
                props.onChange?.(newOption.value, newOption);

                // Update options if setter is available
                if (typeof props.options === 'object' && !Array.isArray(props.options)) {
                    // This would need to be handled by parent component
                }
            }
        } finally {
            setIsCreating(false);
            setPendingCreation(null);
        }
    }, [pendingCreation, onCreateNew, props]);

    const handleCancelCreate = useCallback(() => {
        setPendingCreation(null);
    }, []);

    return (
        <>
            <Combobox {...props} onCreateNew={onCreateNew ? handleCreateNew : undefined} />
            <AlertDialog
                open={pendingCreation !== null}
                onOpenChange={(open) => {
                    if (!open) handleCancelCreate();
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{createConfirmTitle}</AlertDialogTitle>
                        {createConfirmDescription && <AlertDialogDescription>{createConfirmDescription}</AlertDialogDescription>}
                        {!createConfirmDescription && pendingCreation && (
                            <AlertDialogDescription>
                                Create new item: <strong>"{pendingCreation}"</strong>
                            </AlertDialogDescription>
                        )}
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isCreating}>{createConfirmCancel}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmCreate} disabled={isCreating}>
                            {isCreating ? 'Creating...' : createConfirmAction}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
