'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
	const [isMounted, setIsMounted] = useState(false);
	const { theme, setTheme } = useTheme();
	useEffect(() => {
		setIsMounted(true);
	}, []);
	if (!isMounted) return null;

	const handleThemeChange = () =>
		theme === 'dark' ? setTheme('light') : setTheme('dark');

	return (
		<div
			className="w-10 h-10  flex items-center justify-center cursor-pointer"
			onClick={handleThemeChange}
		>
			{theme == 'dark' ? <Moon></Moon> : <Sun></Sun>}
		</div>
	);
};

export default ThemeToggle;
