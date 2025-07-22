import { ActiveIndicatorProps, NAV_ITEMS, NavItemProps } from '@/config/nav';
import { cn } from '@/lib/utils';
import { PageDataProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { gsap } from 'gsap';
import { useCallback, useEffect, useRef } from 'react';

const INDICATOR_CONFIG = {
    fillOpacity: 0.425,
    borderWidth: 1,
    underlineHeight: 4,
    animation: {
        shrink: { duration: 0.15, ease: 'power1.inOut' },
        slide: { duration: 0.3, ease: 'power2.out' },
        expand: { duration: 0.45, ease: 'elastic.out(1, 0.6)' },
    },
} as const;

// ---------- Components ----------
export function NavMenu() {
    return (
        <nav aria-label="navigation-menu" dir="ltr" className="relative flex h-28 items-start justify-center">
            <NavItemWrappers />
        </nav>
    );
}

export function NavItemWrappers() {
    const itemRefs = useRef(new Map<string, HTMLLIElement>());
    const { page } = usePage<PageDataProps>().props;

    return (
        <ul className="relative flex gap-x-2 rounded-md bg-white/90 p-5 text-lg font-medium text-app-primary-400/80 uppercase shadow ring-1 shadow-app-primary-200/80 ring-app-primary-300">
            <ActiveIndicator activeUuid={page.uuid} itemRefs={itemRefs} />
            {NAV_ITEMS.map((menu) => (
                <NavItem
                    key={menu.uuid}
                    {...menu}
                    isActive={page.uuid === menu.uuid}
                    refCallback={(el) => {
                        if (el) itemRefs.current.set(menu.uuid, el);
                        else itemRefs.current.delete(menu.uuid);
                    }}
                />
            ))}
        </ul>
    );
}

export function NavItem({ href, title, isActive, refCallback }: NavItemProps) {
    return (
        <li
            ref={refCallback}
            data-active={isActive}
            className={cn(
                'group relative z-1 block px-4 py-2 transition-colors duration-500 hover:text-app-primary-600',
                isActive && 'text-app-primary-600',
            )}
        >
            <Link href={href} prefetch className="inline-flex items-center gap-x-1.5" aria-current={isActive ? 'page' : undefined}>
                {title}
            </Link>
        </li>
    );
}

export function ActiveIndicator({ activeUuid, itemRefs }: ActiveIndicatorProps) {
    const indicatorRef = useRef<HTMLSpanElement>(null);
    const firstLoad = useRef(true);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const colorRef = useRef<string>('');

    const animateIndicator = useCallback(() => {
        const indicator = indicatorRef.current;
        const activeEl = itemRefs.current.get(activeUuid);
        if (!indicator || !activeEl) return;

        if (!colorRef.current) {
            colorRef.current = getComputedStyle(indicator).backgroundColor;
        }

        const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = activeEl;
        const targetWidth = offsetWidth;
        const targetHeight = offsetHeight;
        const targetX = offsetLeft;
        const targetY = offsetTop + targetHeight - INDICATOR_CONFIG.underlineHeight;

        if (firstLoad.current) {
            gsap.set(indicator, {
                x: targetX,
                y: targetY - (targetHeight - INDICATOR_CONFIG.underlineHeight),
                width: targetWidth,
                height: targetHeight,
                backgroundColor: colorRef.current,
                opacity: INDICATOR_CONFIG.fillOpacity,
                borderWidth: INDICATOR_CONFIG.borderWidth,
            });
            firstLoad.current = false;
            return;
        }

        gsap.killTweensOf(indicator);

        if (!tlRef.current) {
            tlRef.current = gsap.timeline({ defaults: { overwrite: 'auto' } });
        } else {
            tlRef.current.clear();
        }

        tlRef.current
            // Step 1: Underline (no border, full opacity)
            .set(indicator, { borderWidth: 0 })
            .to(indicator, {
                y: targetY,
                height: INDICATOR_CONFIG.underlineHeight,
                opacity: 1,
                duration: INDICATOR_CONFIG.animation.shrink.duration,
                ease: INDICATOR_CONFIG.animation.shrink.ease,
            })
            // Step 2: Slide underline to new item
            .to(indicator, {
                x: targetX,
                width: targetWidth,
                duration: INDICATOR_CONFIG.animation.slide.duration,
                ease: INDICATOR_CONFIG.animation.slide.ease,
            })
            // Step 3: Expand fill (border visible now)
            .to(indicator, {
                y: targetY - (targetHeight - INDICATOR_CONFIG.underlineHeight),
                height: targetHeight,
                opacity: INDICATOR_CONFIG.fillOpacity,
                borderWidth: INDICATOR_CONFIG.borderWidth,
                duration: INDICATOR_CONFIG.animation.expand.duration,
                ease: INDICATOR_CONFIG.animation.expand.ease,
            });
    }, [activeUuid, itemRefs]);

    useEffect(() => {
        const raf = requestAnimationFrame(animateIndicator);
        return () => cancelAnimationFrame(raf);
    }, [animateIndicator]);

    return (
        <span
            ref={indicatorRef}
            className="absolute top-0 left-0 rounded-md border border-app-primary-300 bg-app-primary-200/80"
            style={{
                width: 0,
                height: INDICATOR_CONFIG.underlineHeight,
                opacity: INDICATOR_CONFIG.fillOpacity,
                borderWidth: 0,
                zIndex: 0,
                transform: 'translate(0px, 0px)',
                willChange: 'transform, width, height, opacity, background-color, border-width',
            }}
            aria-hidden="true"
        ></span>
    );
}
