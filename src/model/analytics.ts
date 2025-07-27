import mongoose, { Schema, Document, model, Model } from 'mongoose';

export interface IAnalytics extends Document {
	config_id: string;
	customerDetails?: { [key: string]: string | number };
	revenue?: number;
	pageView?: number;
	payment?: number;
	conversion?: boolean;
	selectedPaymentMethod?: string;
	discountApplied?: {
		code: string;
		discount: number;
		type: 'percentage' | 'flat';
		active: boolean;
	};

	createdAt? : Date
}

const AnalyticsSchema: Schema = new Schema(
	{
		config_id: { type: String },

		customerDetails: {
			type: Map,
			of: Schema.Types.Mixed,
		},

		revenue: { type: Number },

		pageView: { type: Number, default: 1 },

		payment: { type: Number },

		conversion: { type: Boolean },

		selectedPaymentMethod: { type: String },

		discountApplied: {
			code: { type: String },
			discount: { type: Number },
			type: {
				type: String,
				enum: ['percentage', 'flat'],
			},
			active: { type: Boolean },
		},
	},
	{
		timestamps: true,
	}
);

const Analytics : Model<IAnalytics> = mongoose.models.Analytics || model<IAnalytics>('Analytics', AnalyticsSchema) 
export default Analytics;
