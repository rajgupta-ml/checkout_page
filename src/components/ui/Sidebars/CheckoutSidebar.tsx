import { useCheckoutConfig } from '@/app/hooks/useCheckoutConfig';
import {
	CheckoutField,
	configContext,
	DiscountCode,
} from '@/app/Provider/configProvider';
import { useContext } from 'react';
import { Button } from '../button';
import { Plus, Trash2 } from 'lucide-react';
import { Input } from '../input';

// Checkout Sidebar Component
const CheckoutSidebar = () => {
	const {
		addDiscountCode,
		addField,
		removeDiscountCode,
		removeField,
		updateDiscountCode,
		updateField,
	} = useCheckoutConfig();
	const { checkoutConfig: config } = useContext(configContext);
	return (
		<div className="p-6 space-y-6 text-foreground">
			<div>
				<h2 className="text-lg font-semibold mb-4">Checkout Configuration</h2>
			</div>

			{/* Checkout Fields */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h3 className="font-semibold">Checkout Fields</h3>
					<Button onClick={addField} size="sm" variant="outline">
						<Plus className="w-4 h-4 mr-1" />
						Add Field
					</Button>
				</div>

				<div className="space-y-3">
					{config.fields.map((field: CheckoutField) => (
						<div key={field.id} className="border rounded-lg p-3 space-y-2">
							<div className="flex items-center justify-between">
								<Input
									value={field.name}
									onChange={(e) =>
										updateField(field.id, { name: e.target.value })
									}
									className="text-sm font-medium"
								/>
								<Button
									onClick={() => removeField(field.id)}
									size="sm"
									variant="ghost"
									className="text-red-500 hover:text-red-700"
								>
									<Trash2 className="w-4 h-4" />
								</Button>
							</div>

							<div className="grid grid-cols-2 gap-2">
								<select
									value={field.type}
									onChange={(e) =>
										updateField(field.id, { type: e.target.value })
									}
									className="p-1 border rounded text-sm"
								>
									<option value="text">Text</option>
									<option value="email">Email</option>
									<option value="tel">Phone</option>
									<option value="number">Number</option>
									<option value="textarea">Textarea</option>
								</select>

								<label className="flex items-center space-x-1 text-sm">
									<input
										type="checkbox"
										checked={field.required}
										onChange={(e) =>
											updateField(field.id, { required: e.target.checked })
										}
									/>
									<span>Required</span>
								</label>
							</div>

							<Input
								value={field.placeholder}
								onChange={(e) =>
									updateField(field.id, { placeholder: e.target.value })
								}
								placeholder="Placeholder text"
								className="text-sm"
							/>
						</div>
					))}
				</div>
			</div>

			{/* Discount Codes */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h3 className="font-semibold">Discount Codes</h3>
					<Button onClick={addDiscountCode} size="sm" variant="outline">
						<Plus className="w-4 h-4 mr-1" />
						Add Code
					</Button>
				</div>

				<div className="space-y-3">
					{config.discountCodes.map((code: DiscountCode, index: number) => (
						<div key={index} className="border rounded-lg p-3 space-y-2">
							<div className="flex items-center justify-between">
								<Input
									value={code.code}
									onChange={(e) =>
										updateDiscountCode(index, { code: e.target.value })
									}
									className="font-mono text-sm"
								/>
								<Button
									onClick={() => removeDiscountCode(index)}
									size="sm"
									variant="ghost"
									className="text-red-500 hover:text-red-700"
								>
									<Trash2 className="w-4 h-4" />
								</Button>
							</div>

							<div className="grid grid-cols-2 gap-2">
								<Input
									type="number"
									value={code.discount}
									onChange={(e) =>
										updateDiscountCode(index, {
											discount: Number.parseFloat(e.target.value),
										})
									}
									className="text-sm"
								/>
								<select
									value={code.type}
									onChange={(e) =>
										updateDiscountCode(index, { type: e.target.value })
									}
									className="p-1 border rounded text-sm"
								>
									<option value="percentage">Percentage</option>
									<option value="fixed">Fixed Amount</option>
								</select>
							</div>

							<label className="flex items-center space-x-2 text-sm">
								<input
									type="checkbox"
									checked={code.active}
									onChange={(e) =>
										updateDiscountCode(index, { active: e.target.checked })
									}
								/>
								<span>Active</span>
							</label>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CheckoutSidebar;
