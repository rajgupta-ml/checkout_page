import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IConfig extends Document {
	userId: string;
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
	fields: {
		id: number;
		name: string;
		type: string;
		required: boolean;
		placeholder?: string;
	}[];
	discountCodes: {
		code: string;
		discount: number;
		type: string;
		active: boolean;
	}[];
	brandColors: {
		primary: string;
		secondary: string;
		accent: string;
		background: string;
		text: string;
	};
	customCSS: string;
	afterPayment: {
		title: string;
		description: string;
		showOrderSummary: boolean;
		enableEmailConfirmation: boolean;
		redirectUrl: string;
		customMessage: string;
	};
}

const CheckoutFieldSchema: Schema = new Schema(
	{
		id: { type: Number, required: true },
		name: { type: String, required: true, trim: true },
		type: { type: String, required: true },
		required: { type: Boolean, required: true, default: false },
		placeholder: { type: String, trim: true },
	},
	{ _id: false }
); // _id is not needed for sub-documents in this array

// Sub-schema for discount codes
const DiscountCodeSchema: Schema = new Schema(
	{
		code: { type: String, required: true, trim: true },
		discount: { type: Number, required: true },
		type: { type: String, required: true, enum: ['percentage', 'fixed'] },
		active: { type: Boolean, required: true, default: true },
	},
	{ _id: false }
);

// Sub-schema for brand colors
const BrandColorsSchema: Schema = new Schema(
	{
		primary: { type: String, required: true, default: '#000000' },
		secondary: { type: String, required: true, default: '#6b7280' },
		accent: { type: String, required: true, default: '#3b82f6' },
		background: { type: String, required: true, default: '#ffffff' },
		text: { type: String, required: true, default: '#1f2937' },
	},
	{ _id: false }
);

// Sub-schema for the after-payment configuration
const AfterPaymentConfigSchema: Schema = new Schema(
	{
		title: { type: String, required: true, trim: true },
		description: { type: String, trim: true },
		showOrderSummary: { type: Boolean, required: true, default: true },
		enableEmailConfirmation: { type: Boolean, required: true, default: true },
		redirectUrl: { type: String, trim: true },
		customMessage: { type: String, trim: true },
	},
	{ _id: false }
);

// Main Schema for the entire Checkout Configuration
const ConfigSchema: Schema = new Schema(
	{
		// Product Details
		userId: { type: String, required: true, index: true },
		selectedIndex: { type: Number, required: true, default: 0 },
		selectedPage: { type: Number, required: true, default: 0 },
		selectedLayout: { type: Number, required: true, default: 0 },
		productTitle: { type: String, required: true, trim: true },
		price: { type: Number, required: true },
		originalPrice: { type: Number },
		currency: { type: String, required: true, default: 'USD' },
		description: { type: String, trim: true },
		logoUrl: { type: String, trim: true },
		productImages: [{ type: String }],

		// Checkout Fields
		fields: [CheckoutFieldSchema],

		// Discount Codes
		discountCodes: [DiscountCodeSchema],

		// Design
		brandColors: { type: BrandColorsSchema, required: true },
		customCSS: { type: String },

		// After Payment
		afterPayment: { type: AfterPaymentConfigSchema, required: true },
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

// Create and export the Mongoose model
const ConfigModel: Model<IConfig> =
	mongoose.models.Config || mongoose.model<IConfig>('Config', ConfigSchema);
export default ConfigModel;
