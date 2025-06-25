import { useContext } from 'react';
import { configContext } from '../Provider/configProvider';

interface IUpdate {
	name?: string;
	type?: string;
	required?: boolean; // ✅ should be boolean, not string
	placeholder?: string;
}

interface IDiscountUpdate {
	type?: string;
	code?: string;
	discount?: number;
	active?: boolean;
}

export const useCheckoutConfig = () => {
	const { setCheckoutConfig: setConfig } = useContext(configContext);

	const addField = () => {
		const newField = {
			id: Date.now(),
			name: 'New Field',
			type: 'text',
			required: false,
			placeholder: 'Enter value',
		};
		setConfig((prev) => ({
			...prev,
			fields: [...prev.fields, newField],
		}));
	};

	const removeField = (id: number) => {
		setConfig((prev) => ({
			...prev,
			fields: prev.fields.filter((field) => field.id !== id),
		}));
	};

	const updateField = (id: number, updates: IUpdate) => {
		setConfig((prev) => ({
			...prev,
			fields: prev.fields.map((field) =>
				field.id === id ? { ...field, ...updates } : field
			),
		}));
	};

	const addDiscountCode = () => {
		const newCode = {
			code: `SAVE${Math.floor(Math.random() * 100)}`,
			discount: 10,
			type: 'percentage',
			active: true,
		};
		setConfig((prev) => ({
			...prev,
			discountCodes: [...prev.discountCodes, newCode],
		}));
	};

	const removeDiscountCode = (index: number) => {
		setConfig((prev) => ({
			...prev,
			discountCodes: prev.discountCodes.filter((_, i) => i !== index),
		}));
	};

	const updateDiscountCode = (index: number, updates: IDiscountUpdate) => {
		setConfig((prev) => ({
			...prev,
			discountCodes: prev.discountCodes.map((code, i) =>
				i === index ? { ...code, ...updates } : code
			),
		}));
	};

	return {
		addField,
		addDiscountCode,
		removeDiscountCode,
		removeField,
		updateDiscountCode,
		updateField,
	};
};
