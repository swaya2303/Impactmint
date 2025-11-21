import React from 'react';

export interface ProgressBarProps {
    value: number;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'striped' | 'animated';
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
    showLabel?: boolean;
    label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    value,
    max = 100,
    size = 'md',
    variant = 'default',
    color = 'primary',
    showLabel = false,
    label,
}) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const sizeStyles = {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
    };

    const colorStyles = {
        primary: 'bg-green-500',
        secondary: 'bg-blue-500',
        success: 'bg-green-600',
        warning: 'bg-yellow-500',
        error: 'bg-red-500',
    };

    const getColorByValue = () => {
        if (percentage >= 75) return 'bg-green-500';
        if (percentage >= 50) return 'bg-blue-500';
        if (percentage >= 25) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const barColor = color === 'primary' && !label ? getColorByValue() : colorStyles[color];

    const variantClasses = variant === 'striped' || variant === 'animated'
        ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%]'
        : '';

    const animationClass = variant === 'animated' ? 'animate-shimmer' : '';

    return (
        <div className="w-full">
            {showLabel && (
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                        {label || 'Progress'}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                        {Math.round(percentage)}%
                    </span>
                </div>
            )}
            <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeStyles[size]}`}>
                <div
                    className={`${sizeStyles[size]} ${barColor} ${variantClasses} ${animationClass} rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${percentage}%` }}
                    role="progressbar"
                    aria-valuenow={value}
                    aria-valuemin={0}
                    aria-valuemax={max}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
