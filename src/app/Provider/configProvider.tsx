import { createContext, Dispatch, SetStateAction, useState } from 'react';

export interface CheckoutField {
	id: number;
	name: string;
	type: 'text' | 'email' | 'number' | 'tel' | 'textarea' | string;
	required: boolean;
	placeholder?: string;
}

export interface DiscountCode {
	code: string;
	discount: number;
	type: 'percentage' | 'fixed' | string;
	active: boolean;
}

interface BrandColors {
	primary: string;
	secondary: string;
	accent: string;
	background: string;
	text: string;
}

interface AfterPaymentConfig {
	title: string;
	description: string;
	showOrderSummary: boolean;
	enableEmailConfirmation: boolean;
	redirectUrl: string;
	customMessage: string;
}

export interface CheckoutConfig {
	// Product Details
	selectedIndex: number;
	selectedPage: number;
	selectedLayout: number;
	productTitle: string;
	price: number;
	originalPrice: number;
	currency: string;
	description: string;
	logoUrl: string;
	productImages: string[];

	// Checkout Fields
	fields: CheckoutField[];
	discountCodes: DiscountCode[];

	// Design
	brandColors: BrandColors;
	customCSS: string;

	// After Payment
	afterPayment: AfterPaymentConfig;
}

const config = {
	// Product Details
	selectedIndex: 0,
	selectedPage: 0,
	selectedLayout: 0,
	productTitle: 'Premium Product',
	price: 99.99,
	originalPrice: 129.99,
	currency: 'USD',
	description:
		'High-quality product with amazing features that will transform your experience.',
	logoUrl: '',
	productImages: [],

	// Checkout Fields
	fields: [
		{
			id: 1,
			name: 'Name',
			type: 'text',
			required: true,
			placeholder: 'Enter your full name',
		},
		{
			id: 2,
			name: 'Email address',
			type: 'email',
			required: true,
			placeholder: 'Enter your email',
		},
	],
	discountCodes: [
		{ code: 'SAVE20', discount: 20, type: 'percentage', active: true },
		{ code: 'WELCOME10', discount: 10, type: 'fixed', active: true },
	],

	// Design
	brandColors: {
		primary: '#000000',
		secondary: '#6b7280',
		accent: '#3b82f6',
		background: '#ffffff',
		text: '#1f2937',
	},
	customCSS: '',

	// After Payment
	afterPayment: {
		title: 'Thank you for your purchase!',
		description:
			"Your order has been confirmed and you'll receive an email confirmation shortly.",
		showOrderSummary: true,
		enableEmailConfirmation: true,
		redirectUrl: '',
		customMessage: '',
	},
};

interface ConfigContextType {
	checkoutConfig: CheckoutConfig;
	setCheckoutConfig: Dispatch<SetStateAction<CheckoutConfig>>;
}

export const configContext = createContext<ConfigContextType>({
	checkoutConfig: config,
	setCheckoutConfig: () => {},
});

export const ConfigContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [checkoutConfig, setCheckoutConfig] = useState<CheckoutConfig>(config);

	return (
		<configContext.Provider
			value={{
				checkoutConfig,
				setCheckoutConfig,
			}}
		>
			{children}
		</configContext.Provider>
	);
};
