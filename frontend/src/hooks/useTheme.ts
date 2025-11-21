import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export const useTheme = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        const stored = localStorage.getItem('theme') as Theme;
        return stored || 'system';
    });

    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const root = document.documentElement;
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const applyTheme = (newTheme: Theme) => {
            let applied: 'light' | 'dark' = 'light';

            if (newTheme === 'system') {
                applied = mediaQuery.matches ? 'dark' : 'light';
            } else {
                applied = newTheme;
            }

            setResolvedTheme(applied);

            if (applied === 'dark') {
                root.setAttribute('data-theme', 'dark');
                root.classList.add('dark');
            } else {
                root.removeAttribute('data-theme');
                root.classList.remove('dark');
            }
        };

        applyTheme(theme);

        const handleSystemThemeChange = () => {
            if (theme === 'system') {
                applyTheme('system');
            }
        };

        mediaQuery.addEventListener('change', handleSystemThemeChange);

        return () => {
            mediaQuery.removeEventListener('change', handleSystemThemeChange);
        };
    }, [theme]);

    const toggleTheme = () => {
        const newTheme: Theme = resolvedTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const setThemeMode = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return {
        theme,
        resolvedTheme,
        toggleTheme,
        setTheme: setThemeMode,
    };
};
