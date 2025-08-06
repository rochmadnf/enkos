import * as lucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';
import { ComponentType } from 'react';

type IconName = keyof typeof lucideIcons;

interface MyIconProps extends LucideProps {
    name: IconName;
}

export function MyIcon({ name, ...props }: MyIconProps) {
    const LucideIcon = lucideIcons[name];
    const isValidIcon = typeof LucideIcon === 'function' || typeof LucideIcon === 'object';

    if (!isValidIcon) {
        return null;
    }
    const IconComponent = LucideIcon as ComponentType<LucideProps>;

    return <IconComponent {...props} />;
}
