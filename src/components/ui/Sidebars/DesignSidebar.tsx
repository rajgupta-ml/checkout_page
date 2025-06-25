import { configContext } from '@/app/Provider/configProvider';
import { useContext } from 'react';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '../select';
import { Label } from '../label';
import { Input } from '../input';

const layoutOptions = {
	1: 'Single page',
	2: 'Two Column',
	3: 'Two Column Split',
};

// Design Sidebar Component

const DesignSidebar = () => {
	const { checkoutConfig: config, setCheckoutConfig: setConfig } =
		useContext(configContext);

	const handleValueChange = (value: string) => {
		setConfig((prev) => ({
			...prev,
			selectedLayout: parseInt(value),
		}));
	};

	const { selectedLayout } = config;
	return (
		<div className="p-6 space-y-6">
			<div>
				<h2 className="text-lg font-semibold mb-4">Design Settings</h2>
			</div>

			{/* Layout Selection */}
			<div className="space-y-4">
				<h3 className="font-semibold">Layout</h3>
				<Select
					value={selectedLayout?.toString()}
					onValueChange={handleValueChange}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select layout" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Choose Layout</SelectLabel>
							{Object.entries(layoutOptions).map(([value, label]) => (
								<SelectItem key={value} value={value}>
									{label}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			{/* Brand Colors */}
			<div className="space-y-4">
				<h3 className="font-semibold">Brand Colors</h3>

				{Object.entries(config.brandColors).map(([key, value]) => (
					<div key={key} className="flex items-center justify-between">
						<Label className="capitalize">{key}</Label>
						<div className="flex items-center space-x-2">
							<input
								type="color"
								value={value as string}
								onChange={(e) =>
									setConfig((prev) => ({
										...prev,
										brandColors: { ...prev.brandColors, [key]: e.target.value },
									}))
								}
								className="w-8 h-8 rounded border"
							/>
							<Input
								value={value as string}
								onChange={(e) =>
									setConfig((prev) => ({
										...prev,
										brandColors: { ...prev.brandColors, [key]: e.target.value },
									}))
								}
								className="w-20 text-xs font-mono"
							/>
						</div>
					</div>
				))}
			</div>

			{/* Custom CSS */}
			<div className="space-y-4">
				<h3 className="font-semibold">Custom CSS</h3>
				<textarea
					value={config.customCSS}
					onChange={(e) =>
						setConfig((prev) => ({ ...prev, customCSS: e.target.value }))
					}
					className="w-full h-32 p-2 border rounded-md font-mono text-sm"
					placeholder="/* Add your custom CSS here */
  .checkout-form {
	border-radius: 12px;
  }
  
  .submit-button {
	background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  }"
				/>
			</div>
		</div>
	);
};

export default DesignSidebar;
