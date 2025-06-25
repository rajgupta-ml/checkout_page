import { SignedIn } from '@clerk/nextjs';
import React from 'react';

const Page = () => {
	return (
		<SignedIn>
			<div>
				<div>Page</div>
			</div>
		</SignedIn>
	);
};

export default Page;
