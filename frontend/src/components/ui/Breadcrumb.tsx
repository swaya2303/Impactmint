import React from 'react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    separator?: React.ReactNode;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
    items,
    separator = (
        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
            />
        </svg>
    ),
}) => {
    return (
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <React.Fragment key={index}>
                        {item.href && !isLast ? (
                            <Link
                                to={item.href}
                                className="text-gray-600 hover:text-green-600 transition-colors font-medium"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span
                                className={`${isLast
                                        ? 'text-gray-900 font-semibold'
                                        : 'text-gray-600'
                                    }`}
                            >
                                {item.label}
                            </span>
                        )}
                        {!isLast && <span className="flex-shrink-0">{separator}</span>}
                    </React.Fragment>
                );
            })}
        </nav>
    );
};

export default Breadcrumb;
