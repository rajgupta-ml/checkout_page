import React from 'react';
import { SignIn } from '@clerk/nextjs';
const Page = () => {
	return (
		<div className="flex h-screen items-center justify-center border-2">
			<SignIn></SignIn>
		</div>
	);
};

export default Page;
