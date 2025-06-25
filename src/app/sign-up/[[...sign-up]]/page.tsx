import { SignUp } from '@clerk/nextjs';
import React from 'react';

const Page = () => {
	return (
		<div className="flex h-screen items-center justify-center border-2">
			<SignUp></SignUp>
		</div>
	);
};

export default Page;
