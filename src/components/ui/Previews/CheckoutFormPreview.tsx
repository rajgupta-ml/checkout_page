'use client';
import {
	CheckoutConfig,
	configContext,
	DiscountCode,
} from '@/app/Provider/configProvider';
import { CreditCard, Lock } from 'lucide-react';
import { useContext, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../card';
import { Badge } from '../badge';
import { Label } from '../label';
import { Input } from '../input';
import { Button } from '../button';

// Payment method types
type PaymentMethod = 'card' | 'paypal' | 'apple_pay' | 'google_pay';

interface PaymentData {
	cardNumber: string;
	expiryDate: string;
	cvv: string;
	cardholderName: string;
}

// Enhanced Checkout Form Component with Stripe Support
const CheckoutForm = ({ dbConfig }: { dbConfig?: CheckoutConfig }) => {
	const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode>();
	const [discountCode, setDiscountCode] = useState('');
	const [selectedPaymentMethod, setSelectedPaymentMethod] =
		useState<PaymentMethod>('card');
	const [isProcessing, setIsProcessing] = useState(false);
	const { checkoutConfig } = useContext(configContext);
	const config = dbConfig ?? checkoutConfig;
	const [paymentData, setPaymentData] = useState<PaymentData>({
		cardNumber: '',
		expiryDate: '',
		cvv: '',
		cardholderName: '',
	});

	const applyDiscount = () => {
		const code = config.discountCodes.find(
			(c) => c.code === discountCode && c.active
		);
		if (code) {
			console.log(code);
			setAppliedDiscount(code);
		} else {
			alert('Invalid discount code');
		}
	};

	const calculateTotal = () => {
		let total = config.price;
		if (appliedDiscount) {
			if (appliedDiscount.type === 'percentage') {
				total = total * (1 - appliedDiscount.discount / 100);
			} else {
				total = total - appliedDiscount.discount;
			}
		}
		return Math.max(0, total).toFixed(2);
	};

	const formatCardNumber = (value: string) => {
		const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
		const matches = v.match(/\d{4,16}/g);
		const match = (matches && matches[0]) || '';
		const parts = [];
		for (let i = 0, len = match.length; i < len; i += 4) {
			parts.push(match.substring(i, i + 4));
		}
		if (parts.length) {
			return parts.join(' ');
		} else {
			return v;
		}
	};

	const formatExpiryDate = (value: string) => {
		const v = value.replace(/\D/g, '');
		if (v.length >= 2) {
			return v.substring(0, 2) + '/' + v.substring(2, 4);
		}
		return v;
	};

	const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formatted = formatCardNumber(e.target.value);
		if (formatted.length <= 19) {
			setPaymentData((prev) => ({ ...prev, cardNumber: formatted }));
		}
	};

	const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formatted = formatExpiryDate(e.target.value);
		if (formatted.length <= 5) {
			setPaymentData((prev) => ({ ...prev, expiryDate: formatted }));
		}
	};

	const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, '');
		if (value.length <= 4) {
			setPaymentData((prev) => ({ ...prev, cvv: value }));
		}
	};

	const handlePayment = async () => {
		setIsProcessing(true);

		// Simulate payment processing
		try {
			// Here you would integrate with Stripe
			// const stripe = await loadStripe('your-publishable-key');
			// const result = await stripe.confirmCardPayment(client_secret, {
			//   payment_method: {
			//     card: elements.getElement(CardElement),
			//     billing_details: { name: paymentData.cardholderName }
			//   }
			// });

			await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
			alert('Payment processed successfully!');
		} catch (error) {
			console.error(error);
			alert('Payment failed. Please try again.');
		} finally {
			setIsProcessing(false);
		}
	};

	const paymentMethods = [
		{
			id: 'card',
			name: 'Credit/Debit Card',
			icon: <CreditCard className="w-4 h-4" />,
		},
		{
			id: 'paypal',
			name: 'PayPal',
			icon: (
				<div className="w-4 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
					P
				</div>
			),
		},
		{
			id: 'apple_pay',
			name: 'Apple Pay',
			icon: (
				<div className="w-4 h-4 bg-black rounded text-white text-xs flex items-center justify-center">
					A
				</div>
			),
		},
		{
			id: 'google_pay',
			name: 'Google Pay',
			icon: (
				<div className="w-4 h-4 bg-blue-500 rounded text-white text-xs flex items-center justify-center">
					G
				</div>
			),
		},
	];

	return (
		<Card className="w-full max-w-lg">
			<CardHeader>
				<CardTitle className="text-center flex items-center justify-center gap-2">
					<Lock className="w-5 h-5" />
					Secure Checkout
				</CardTitle>
				<div className="text-center">
					<div className="flex items-center justify-center space-x-2">
						<span className="text-3xl font-bold">${calculateTotal()}</span>
						{appliedDiscount && (
							<span
								style={{ backgroundColor: config.brandColors.primary }}
								className="text-sm line-through px-2 py-0.5 rounded text-white"
							>
								${config.price.toFixed(2)}
							</span>
						)}
					</div>
					{appliedDiscount && (
						<Badge variant="secondary" className="mt-1">
							{appliedDiscount.code} applied (
							{appliedDiscount.type === 'percentage'
								? `${appliedDiscount.discount}%`
								: `$${appliedDiscount.discount}`}
							)
						</Badge>
					)}
				</div>
			</CardHeader>

			<CardContent className="space-y-6">
				{/* Customer Fields */}
				<div className="space-y-4">
					<h3 className="font-semibold text-lg">Customer Information</h3>
					{config.fields.map((field) => (
						<div key={field.id} className="flex flex-col gap-2">
							<Label htmlFor={field.name}>
								{field.name}{' '}
								{field.required && (
									<span style={{ color: config.brandColors.accent }}>*</span>
								)}
							</Label>
							{field.type === 'textarea' ? (
								<textarea
									id={field.name}
									placeholder={field.placeholder}
									required={field.required}
									className="w-full p-3 border rounded-md h-20 resize-none"
									style={{ borderColor: config.brandColors.secondary }}
								/>
							) : (
								<Input
									id={field.name}
									type={field.type}
									placeholder={field.placeholder}
									required={field.required}
									style={{
										outlineColor: config.brandColors.accent,
										borderColor: config.brandColors.secondary,
									}}
									className="focus:outline-2"
								/>
							)}
						</div>
					))}
				</div>

				{/* Payment Method Selection */}
				<div className="space-y-4">
					<h3 className="font-semibold text-lg">Payment Method</h3>
					<div className="grid grid-cols-2 gap-2">
						{paymentMethods.map((method) => (
							<button
								key={method.id}
								onClick={() =>
									setSelectedPaymentMethod(method.id as PaymentMethod)
								}
								className={`p-3 border rounded-md flex items-center gap-2 transition-colors ${
									selectedPaymentMethod === method.id
										? 'border-[3px]'
										: 'border border-gray-200 hover:border-gray-300'
								}`}
								style={{
									borderColor:
										selectedPaymentMethod === method.id
											? config.brandColors.accent
											: undefined,
									backgroundColor:
										selectedPaymentMethod === method.id
											? `${config.brandColors.accent}20`
											: undefined,
								}}
							>
								{method.icon}
								<span className="text-sm">{method.name}</span>
							</button>
						))}
					</div>
				</div>

				{/* Card Details */}
				{selectedPaymentMethod === 'card' && (
					<div className="space-y-4">
						<h3 className="font-semibold text-lg">Card Details</h3>

						<Input
							id="cardNumber"
							value={paymentData.cardNumber}
							onChange={handleCardNumberChange}
							placeholder="1234 5678 9012 3456"
							style={{ outlineColor: config.brandColors.accent }}
							className="focus:outline-2 "
							required
						/>

						<div className="grid grid-cols-2 gap-4">
							<Input
								id="expiryDate"
								value={paymentData.expiryDate}
								onChange={handleExpiryChange}
								placeholder="MM/YY"
								style={{ outlineColor: config.brandColors.accent }}
								className="focus:outline-2"
								required
							/>
							<Input
								id="cvv"
								value={paymentData.cvv}
								onChange={handleCvvChange}
								placeholder="123"
								style={{ outlineColor: config.brandColors.accent }}
								className="focus:outline-2 "
								required
							/>
						</div>

						<Input
							id="cardholderName"
							value={paymentData.cardholderName}
							onChange={(e) =>
								setPaymentData((prev) => ({
									...prev,
									cardholderName: e.target.value,
								}))
							}
							placeholder="John Doe"
							style={{ outlineColor: config.brandColors.accent }}
							className="focus:outline-2"
							required
						/>
					</div>
				)}

				{/* Discount Code */}
				{config.discountCodes.length > 0 && (
					<div className="space-y-2">
						<Label htmlFor="discount">Discount Code</Label>
						<div className="flex space-x-2">
							<Input
								id="discount"
								value={discountCode}
								onChange={(e) => setDiscountCode(e.target.value)}
								placeholder="Enter discount code"
							/>
							<Button onClick={applyDiscount} variant="outline" size="sm">
								Apply
							</Button>
						</div>
					</div>
				)}

				{/* Submit Button */}
				<div className="border-t pt-6">
					<Button
						onClick={handlePayment}
						disabled={isProcessing}
						className="w-full text-white font-semibold py-3 text-lg cursor-pointer"
						size="lg"
						style={{
							backgroundColor: config.brandColors.primary,
						}}
						onMouseEnter={(e) =>
							(e.currentTarget.style.backgroundColor =
								config.brandColors.secondary)
						}
						onMouseLeave={(e) =>
							(e.currentTarget.style.backgroundColor =
								config.brandColors.primary)
						}
					>
						{isProcessing ? (
							<div className="flex items-center gap-2">
								<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
								Processing...
							</div>
						) : (
							`Complete Payment - $${calculateTotal()}`
						)}
					</Button>

					<div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
						<Lock className="w-3 h-3" />
						<span>Payments are secure & encrypted with SSL</span>
					</div>

					<div className="flex items-center justify-center gap-4 mt-2">
						<span className="text-xs text-muted-foreground">Powered by</span>
						<div className="flex items-center gap-1">
							<div
								className="w-6 h-4 rounded text-white text-xs flex items-center justify-center font-bold"
								style={{ backgroundColor: config.brandColors.accent }}
							>
								S
							</div>
							<span className="text-xs font-semibold">Stripe</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default CheckoutForm;
