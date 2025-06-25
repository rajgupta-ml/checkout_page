import { configContext } from '@/app/Provider/configProvider';
import { useContext } from 'react';
import { Label } from '../label';
import { Input } from '../input';

const AfterPaymentSidebar = () => {
	const { checkoutConfig: config, setCheckoutConfig: setConfig } =
		useContext(configContext);
	return (
		<div className="p-6 space-y-6">
			<div>
				<h2 className="text-lg font-semibold mb-4">After Payment Settings</h2>
			</div>

			<div className="space-y-4 ">
				<div className="flex flex-col gap-2">
					<Label htmlFor="afterPaymentTitle">Success Title</Label>
					<Input
						id="afterPaymentTitle"
						value={config.afterPayment.title}
						onChange={(e) =>
							setConfig((prev) => ({
								...prev,
								afterPayment: { ...prev.afterPayment, title: e.target.value },
							}))
						}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="afterPaymentDescription">Description</Label>
					<textarea
						id="afterPaymentDescription"
						value={config.afterPayment.description}
						onChange={(e) =>
							setConfig((prev) => ({
								...prev,
								afterPayment: {
									...prev.afterPayment,
									description: e.target.value,
								},
							}))
						}
						className="w-full p-2 border rounded-md h-20 resize-none"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="customMessage">Custom Message</Label>
					<textarea
						id="customMessage"
						value={config.afterPayment.customMessage}
						onChange={(e) =>
							setConfig((prev) => ({
								...prev,
								afterPayment: {
									...prev.afterPayment,
									customMessage: e.target.value,
								},
							}))
						}
						className="w-full p-2 border rounded-md h-16 resize-none"
						placeholder="Add any additional message..."
					/>
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="redirectUrl">Redirect URL (optional)</Label>
					<Input
						id="redirectUrl"
						value={config.afterPayment.redirectUrl}
						onChange={(e) =>
							setConfig((prev) => ({
								...prev,
								afterPayment: {
									...prev.afterPayment,
									redirectUrl: e.target.value,
								},
							}))
						}
						placeholder="https://yoursite.com/thank-you"
					/>
				</div>
			</div>

			<div className="space-y-3">
				<h3 className="font-semibold">Options</h3>

				<label className="flex items-center space-x-2">
					<input
						type="checkbox"
						checked={config.afterPayment.showOrderSummary}
						onChange={(e) =>
							setConfig((prev) => ({
								...prev,
								afterPayment: {
									...prev.afterPayment,
									showOrderSummary: e.target.checked,
								},
							}))
						}
					/>
					<span className="text-sm">Show order summary</span>
				</label>

				<label className="flex items-center space-x-2">
					<input
						type="checkbox"
						checked={config.afterPayment.enableEmailConfirmation}
						onChange={(e) =>
							setConfig((prev) => ({
								...prev,
								afterPayment: {
									...prev.afterPayment,
									enableEmailConfirmation: e.target.checked,
								},
							}))
						}
					/>
					<span className="text-sm">Send email confirmation</span>
				</label>
			</div>
		</div>
	);
};

export default AfterPaymentSidebar;
