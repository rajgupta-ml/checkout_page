import { CheckoutConfig, configContext } from '@/app/Provider/configProvider';
import { Dispatch, SetStateAction, useContext, useRef } from 'react';
import { Step1, Step2, Step3 } from './Steps';
import { ChevronLeftCircle } from 'lucide-react';

export interface StepRefHandle {
	isValid: () => boolean;
	getData: () => Partial<CheckoutConfig>;
}

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

const MultiStepForm = ({
	stepIndex,
	setStepIndex,
}: {
	stepIndex: number;
	setStepIndex: Dispatch<SetStateAction<number>>;
}) => {
	const currentStepRef = useRef<StepRefHandle>(null);
	const { setCheckoutConfig } = useContext(configContext);

	const StepComponent = steps[stepIndex].component;
	const title = steps[stepIndex].label;
	const desc = steps[stepIndex].desc;
	const goNext = () => {
		if (currentStepRef.current && currentStepRef.current.isValid()) {
			const data = currentStepRef.current.getData();
			setCheckoutConfig((prev) => ({
				...prev,
				...data,
			}));
			if (stepIndex < steps.length - 1) setStepIndex((prev) => prev + 1);
			else alert('Form Complete');
		} else {
			alert('Please fill required fields!');
		}
	};

	const goBack = () => {
		if (stepIndex > 0) setStepIndex((prev) => prev - 1);
	};

	const showContinueButton = stepIndex < steps.length - 1;

	return (
		<div className="flex justify-center items-center h-full flex-col gap-2">
			{stepIndex > 0 && stepIndex < 2 && (
				<div className="w-4 h-4 absolute top-0 left-0 p-4 " onClick={goBack}>
					<ChevronLeftCircle></ChevronLeftCircle>
				</div>
			)}
			{stepIndex < steps.length - 1 && (
				<>
					<h1 className="text-2xl font-bold">{title}</h1>
					<p className="text-md text-muted-foreground">{desc}</p>
				</>
			)}
			<StepComponent ref={currentStepRef} />
			{showContinueButton && (
				<div
					onClick={goNext}
					className="bg-primary w-full max-w-sm text-center text-background p-3 rounded-md cursor-pointer hover:bg-primary/90"
				>
					Continue
				</div>
			)}
		</div>
	);
};

export default MultiStepForm;
