import React from 'react';
import ThemeToggle from './ThemeToggle';
import { UserButton } from '@clerk/nextjs';

const Navbar = () => {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center justify-center">
				<SVG></SVG>
				<h1 className="text-xl font-bold">Checkout Page </h1>
			</div>
			<div className='flex items-cen gap-4'>
			<ThemeToggle></ThemeToggle>
			<UserButton></UserButton>

			</div>
		</div>
	);
};

export default Navbar;

export const SVG = () => {
	return (
		<svg
			width="40"
			height="40"
			viewBox="0 0 400 400"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="inline-block mr-2 h-full pb-1.5"
		>
			<circle cx="200" cy="200" r="200" fill="var(--foreground)"></circle>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M287.567 154.425c-.51-7.72-3.169-14.453-9.11-19.692l9.11 19.692zM136.811 219.05c1.751 9.252 6.146 16.98 12.769 23.491-4.255-7.832-8.512-15.662-12.769-23.491zm-31.626-21.201c-4.844-33.069 5.295-71.674 27.985-91.134 22.69-19.459 44.023-22.447 67.854-22.709 27.893-.307 51.544 10.483 71.519 29 19.31 17.894 27.69 40.354 23.328 66.888-1.486 9.038-7.032 15.12-14.543 19.658-2.21 1.335-4.845 2.222-7.178.334-2.229-1.798-.31-3.867.081-5.842 2.157-10.915-2.113-20.486-6.789-29.762-8.497-16.853-20.884-31.836-37.014-41.351-18.094-10.675-38.905-12.973-55.115-9.729-16.21 3.243-24.64 12.972-32.421 25.945-7.781 12.972-8.717 44.864.901 72.702 9.888 28.617 28.708 51.305 54.801 66.717 26.757 15.807 53.543 14.573 78.391-4.999 4.208-3.315 8.673-2.32 12.977-3.13 2.608-.494 4.219 1.981 4.218 5.156.001 7.02-3.556 11.915-8.559 16.31-11.43 10.035-24.93 15.9-39.366 19.883-25.938 7.159-51.067 5.485-75.105-7.245-1.648-.877-3.267-1.616-4.377-3.463-4.429-3.018-4.342-4.953-8.342-5.794-3.165-.668-5.962-3.862-8.566-6.315-25.236-23.742-41.176-52.238-44.68-91.12z"
				fill="var(--primary)"
			></path>
		</svg>
	);
};
