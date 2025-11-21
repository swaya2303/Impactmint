import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: 'default' | 'filled' | 'outlined';
    inputSize?: 'sm' | 'md' | 'lg';
    error?: boolean;
    success?: boolean;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    variant = 'default',
    inputSize = 'md',
    error = false,
    success = false,
    helperText,
    leftIcon,
    rightIcon,
    label,
    className = '',
    disabled,
    ...props
}, ref) => {
    const baseStyles = 'w-full rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1';

    const variantStyles = {
        default: 'bg-white border border-gray-300 focus:border-green-500 focus:ring-green-500',
        filled: 'bg-gray-100 border-0 focus:bg-white focus:ring-green-500',
        outlined: 'bg-transparent border-2 border-gray-300 focus:border-green-500 focus:ring-green-500',
    };

    const sizeStyles = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-5 py-3 text-lg',
    };

    const stateStyles = error
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
        : success
            ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
            : '';

    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : '';

    const paddingWithIcon = leftIcon ? 'pl-10' : rightIcon ? 'pr-10' : '';

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <div className="relative">
                {leftIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {leftIcon}
                    </div>
                )}
                <input
                    ref={ref}
                    className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[inputSize]} ${stateStyles} ${disabledStyles} ${paddingWithIcon} ${className}`}
                    disabled={disabled}
                    {...props}
                />
                {rightIcon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {rightIcon}
                    </div>
                )}
            </div>
            {helperText && (
                <p className={`mt-1 text-sm ${error ? 'text-red-500' : success ? 'text-green-500' : 'text-gray-500'}`}>
                    {helperText}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
