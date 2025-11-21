import React, { useState } from 'react';

export interface TooltipProps {
    children: React.ReactNode;
    content: string | React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
    variant?: 'dark' | 'light';
}

const Tooltip: React.FC<TooltipProps> = ({
    children,
    content,
    position = 'top',
    delay = 200,
    variant = 'dark',
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState<number | null>(null);


    const showTooltip = () => {
        const id = setTimeout(() => {
            setIsVisible(true);
        }, delay);
        setTimeoutId(id);
    };

    const hideTooltip = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        setIsVisible(false);
    };

    const positionStyles = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    const arrowStyles = {
        top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
        left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
        right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent',
    };

    const variantStyles = variant === 'dark'
        ? 'bg-gray-900 text-white'
        : 'bg-white text-gray-900 border border-gray-200 shadow-lg';

    const arrowColor = variant === 'dark' ? 'border-gray-900' : 'border-white';

    return (
        <div
            className="relative inline-block"
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
        >
            {children}
            {isVisible && (
                <div
                    className={`absolute z-50 px-3 py-2 text-sm rounded-lg whitespace-nowrap ${positionStyles[position]} ${variantStyles} animate-fadeIn`}
                    role="tooltip"
                >
                    {content}
                    <div
                        className={`absolute w-0 h-0 border-4 ${arrowStyles[position]} ${arrowColor}`}
                    />
                </div>
            )}
        </div>
    );
};

export default Tooltip;
