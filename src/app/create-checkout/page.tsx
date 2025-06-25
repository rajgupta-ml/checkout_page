'use client';
import { Step1, Step2, Step3 } from '@/components/ui/Steps';
import React, { useState } from 'react';
import { ConfigContextProvider } from '../Provider/configProvider';
import MultiStepForm from '@/components/ui/MultiStepForm';

const steps = [
	{
		label: 'Page Type',
		desc: 'Create a checkout, event or form page',
		component: Step1,
	},
	{
		label: 'Your checkout page',
		desc: 'How you will use your page',
		component: Step2,
	},

	{ label: 'Select Type', component: Step3 },
];
const Page = () => {
	const [stepIndex, setStepIndex] = useState(0);

	return (
		<div>
			<div
				className="absolute h-1 bg-primary top-0 left-0 transition-all duration-300"
				style={{
					width: `${((stepIndex + 1) / steps.length) * 100}%`,
				}}
			></div>

			<div className="h-screen  w-full">
				<ConfigContextProvider>
					<MultiStepForm
						stepIndex={stepIndex}
						setStepIndex={setStepIndex}
					></MultiStepForm>
				</ConfigContextProvider>
			</div>
		</div>
	);
};

export default Page;
