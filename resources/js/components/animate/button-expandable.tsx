import { useClickOutside } from '@/hooks/use-click-outside';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { gsap } from 'gsap';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

export interface IconButtonExpandableProps {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
}

export const iconButtonExpandableVariants = cva(
    'inline-flex shrink-0 cursor-pointer items-center overflow-hidden rounded-full bg-primary text-sm font-medium whitespace-nowrap text-primary-foreground transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
                destructive:
                    'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
                info: 'bg-blue-500 text-white shadow-xs hover:bg-blue-500/90 focus-visible:ring-blue-500/20 dark:focus-visible:ring-blue-500/40 dark:bg-blue-500/60',
                warning:
                    'bg-amber-500 text-white shadow-xs hover:bg-amber-500/90 focus-visible:ring-amber-500/20 dark:focus-visible:ring-amber-500/40 dark:bg-amber-500/60',
                netral: 'bg-gray-600 text-gray-50 shadow-xs hover:bg-gray-600/90 focus-visible:ring-gray-600/20 dark:focus-visible:ring-gray-600/40 dark:bg-gray-600/60',
            },
            size: {
                sm: 'text-xs p-1.5 [&_svg]:size-4', // start: 28px
                default: 'p-2.5 [&_svg]:size-5', // start: 40px
                base: 'p-[0.675rem] [&_svg]:size-6 text-base', // start: 45px
                lg: 'p-3 [&_svg]:size-8 text-lg', // start: 44px
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

const startWidthByVariant = {
    sm: 28,
    default: 40,
    base: 46,
    lg: 44,
};

export function IconButtonExpandable({
    className,
    variant,
    size,
    icon,
    onClick,
    label,
    ...props
}: React.ComponentProps<'button'> & VariantProps<typeof iconButtonExpandableVariants> & IconButtonExpandableProps) {
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);
    const startWidthRef = useRef<number>(startWidthByVariant[size as keyof typeof startWidthByVariant]);
    const endWidthRef = useRef(0);
    const animationTimeline = useRef<gsap.core.Timeline | null>(null);

    useLayoutEffect(() => {
        if (buttonRef.current && labelRef.current) {
            endWidthRef.current = buttonRef.current.scrollWidth;
            labelRef.current.style.display = 'none';
            startWidthRef.current = buttonRef.current.scrollWidth;
        }
    }, []);

    const animateExpand = useCallback((expand: boolean) => {
        if (!buttonRef.current || !labelRef.current) return;

        // Kill previous animations to avoid overlaps
        animationTimeline.current?.kill();
        animationTimeline.current = gsap.timeline();

        if (expand) {
            animationTimeline.current
                .to(buttonRef.current, {
                    width: endWidthRef.current,
                    duration: 0.3,
                    ease: 'power2.out',
                })
                .to(
                    labelRef.current,
                    {
                        display: 'inline',
                        opacity: 1,
                        duration: 0.2,
                        ease: 'power2.out',
                    },
                    '-=0.05',
                );
        } else {
            animationTimeline.current
                .to(labelRef.current, {
                    display: 'none',
                    opacity: 0,
                    duration: 0.15,
                    ease: 'power2.in',
                })
                .to(buttonRef.current, {
                    width: startWidthRef.current,
                    duration: 0.25,
                    ease: 'power2.inOut',
                });
        }
    }, []);

    useEffect(() => {
        animateExpand(hovered || active);
    }, [hovered, active, animateExpand]);

    useClickOutside(buttonRef, () => {
        setActive(false);
        setHovered(false);
    });

    const handleClick = () => {
        setActive((prev) => !prev);
        onClick?.();
    };

    return (
        <button
            ref={buttonRef}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => !active && setHovered(false)}
            onClick={handleClick}
            className={cn(iconButtonExpandableVariants({ variant, size, className }))}
            style={{ width: startWidthRef.current }}
            {...props}
        >
            <div className="flex items-center justify-center gap-x-1">
                {icon}
                <span ref={labelRef} className="inline opacity-0">
                    {label}
                </span>
            </div>
        </button>
    );
}
