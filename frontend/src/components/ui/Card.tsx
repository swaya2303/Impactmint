import React from 'react';

export interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'gradient' | 'glass' | 'bordered';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hover?: boolean;
    className?: string;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    loading?: boolean;
}

const Card: React.FC<CardProps> = ({
    children,
    variant = 'default',
    padding = 'md',
    hover = false,
    className = '',
    header,
    footer,
    loading = false,
}) => {
    const baseStyles = 'rounded-xl transition-all duration-300';

    const variantStyles = {
        default: 'bg-white dark:bg-gray-800 shadow-md hover:shadow-xl',
        gradient: 'bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 shadow-lg hover:shadow-2xl',
        glass: 'bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl',
        bordered: 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500',
    };

    const paddingStyles = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    const hoverStyles = hover ? 'hover:shadow-2xl hover:-translate-y-1 cursor-pointer transform' : '';

    if (loading) {
        return (
            <div className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}>
                <div className="animate-pulse space-y-4">
                    <div className="skeleton-title" />
                    <div className="skeleton-text" />
                    <div className="skeleton-text" />
                    <div className="skeleton-text w-3/4" />
                </div>
            </div>
        );
    }

    return (
        <div className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className} overflow-hidden`}>
            {header && (
                <div className={`border-b border-gray-200 dark:border-gray-700 ${paddingStyles[padding]} pb-4`}>
                    {header}
                </div>
            )}
            <div className={header || footer ? paddingStyles[padding] : paddingStyles[padding]}>
                {children}
            </div>
            {footer && (
                <div className={`border-t border-gray-200 dark:border-gray-700 ${paddingStyles[padding]} pt-4 bg-gray-50 dark:bg-gray-900/50`}>
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;

