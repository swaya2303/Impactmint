import React from 'react';

export interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'circular' | 'dots' | 'pulse';
    color?: 'primary' | 'secondary' | 'white';
    overlay?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({
    size = 'md',
    variant = 'circular',
    color = 'primary',
    overlay = false,
}) => {
    const sizeStyles = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16',
    };

    const colorStyles = {
        primary: 'text-green-500',
        secondary: 'text-blue-500',
        white: 'text-white',
    };

    const renderSpinner = () => {
        if (variant === 'circular') {
            return (
                <svg
                    className={`animate-spin ${sizeStyles[size]} ${colorStyles[color]}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            );
        }

        if (variant === 'dots') {
            const dotSize = size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-5 h-5';
            return (
                <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className={`${dotSize} ${colorStyles[color]} bg-current rounded-full animate-bounce`}
                            style={{ animationDelay: `${i * 0.15}s` }}
                        />
                    ))}
                </div>
            );
        }

        if (variant === 'pulse') {
            return (
                <div
                    className={`${sizeStyles[size]} ${colorStyles[color]} bg-current rounded-full animate-pulse`}
                />
            );
        }

        return null;
    };

    if (overlay) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                {renderSpinner()}
            </div>
        );
    }

    return <div className="flex items-center justify-center">{renderSpinner()}</div>;
};

export default Spinner;
