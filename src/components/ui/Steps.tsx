import React, { useContext, useImperativeHandle, useState } from 'react';
import { CardIcon, EventIcon, FormIcon } from './SvgIcons';
import { Card, CardDescription, CardHeader, CardTitle } from './card';
import { CheckCircle2 } from 'lucide-react';
import { Button } from './button';
import { configContext } from '@/app/Provider/configProvider';
import CheckoutForm from './Previews/CheckoutFormPreview';
import ProductSidebar from './Sidebars/ProductSidebar';
import CheckoutSidebar from './Sidebars/CheckoutSidebar';
import DesignSidebar from './Sidebars/DesignSidebar';
import AfterPaymentSidebar from './Sidebars/AfterPaymentSidebar';
import AfterPaymentPreview from './Previews/AfterPaymentPreview';
import ProductInfo from './Previews/ProductInfoPreview';
import { StepRefHandle } from './MultiStepForm';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
export const Step1 = ({ ref }: { ref: React.Ref<StepRefHandle> }) => {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	const cards = [
		{
			icon: <CardIcon />,
			title: 'Checkout',
			desc: 'Sell products and subscription',
		},
		{
			icon: <EventIcon />,
			title: 'Event',
			desc: 'Sell Tickets and check-in guest',
		},
		{
			icon: <FormIcon />,
			title: 'Form',
			desc: 'Capture leads and collect feedback',
		},
	];

	useImperativeHandle(
		ref,
		() => ({
			isValid: () => selectedIndex !== null,
			getData: () => ({ selectedIndex: selectedIndex ?? 0 }),
		}),
		[selectedIndex]
	);

	return (
		<div className="flex flex-col items-center gap-2 w-full">
			{cards.map((data, idx) => (
				<Card
					key={idx}
					onClick={() => setSelectedIndex(idx)}
					className={`w-full max-w-sm cursor-pointer transition-colors duration-200 ${
						selectedIndex === idx ? 'relative border-primary border-2' : ''
					}`}
				>
					<CardHeader className="flex gap-3 items-center">
						{data.icon}
						{selectedIndex === idx && (
							<div className="absolute top-0 right-0 p-4 text-primary">
								<CheckCircle2 className="w-4 h-4" />
							</div>
						)}
						<div className="flex flex-col">
							<CardTitle className="text-lg">{data.title}</CardTitle>
							<CardDescription>{data.desc}</CardDescription>
						</div>
					</CardHeader>
				</Card>
			))}
		</div>
	);
};

// Layout component for better reusability
const LayoutPreview = ({
	layout,
	isSelected,
	onClick,
}: {
	layout: number;
	isSelected: boolean;
	onClick: () => void;
}) => {
	const getLayoutContent = () => {
		switch (layout) {
			case 1:
				return <div className="bg-muted-foreground/20 w-16 rounded-sm h-16 " />;
			case 2:
				return (
					<div className="flex gap-1">
						<div className="h-16 w-16 bg-muted-foreground/20 rounded-sm" />
						<div className="h-16 w-16 bg-muted-foreground/20 rounded-sm" />
					</div>
				);
			case 3:
				return (
					<div className="flex gap-1">
						<div className="h-16 w-16 bg-transparent rounded-sm" />
						<div className="h-16 w-16 bg-muted-foreground/20 rounded-sm" />
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<Card
			onClick={onClick}
			className={`cursor-pointer transition-colors duration-200 p-2 ${
				isSelected ? 'border-primary border-2' : ''
			}`}
		>
			{getLayoutContent()}
		</Card>
	);
};

export const Step2 = ({ ref }: { ref: React.Ref<StepRefHandle> }) => {
	const [selectedPage, setSelectedPage] = useState<number | null>(null);
	const [selectedLayout, setSelectedLayout] = useState<number | null>(null);

	// Page options configuration
	const pageOptions = [
		{
			id: 1,
			title: 'Hosted Page',
			description: 'Linked to a hosted checkout page',
		},
		{
			id: 2,
			title: 'Add to site',
			description: 'Add checkout to your site',
		},
	];

	// Layout options (you can expand this as needed)
	const layoutOptions1 = [1, 2, 3];
	const layoutOptions2 = [3, 1];

	const layoutOption = [layoutOptions1, layoutOptions2];
	// Expose methods to parent via ref
	useImperativeHandle(ref, () => ({
		isValid: () => selectedPage !== null && selectedLayout !== null,
		getData: () => ({
			selectedPage: selectedPage ?? 0,
			selectedLayout: selectedLayout ?? 0,
		}),
	}));

	return (
		<div className="w-full max-w-xl flex flex-col items-center justify-center gap-6">
			{/* Page Selection */}
			<div className="w-full flex items-center justify-center gap-2">
				{pageOptions.map((option) => (
					<Card
						key={option.id}
						onClick={() => setSelectedPage(option.id)}
						className={`w-full max-w-xs cursor-pointer transition-colors duration-200 rounded-sm p-3 px-1 ${
							selectedPage === option.id ? 'border-primary border-2' : ''
						}`}
					>
						<CardHeader>
							<CardTitle>{option.title}</CardTitle>
							<CardDescription>{option.description}</CardDescription>
						</CardHeader>
					</Card>
				))}
			</div>
			{selectedPage && (
				<div className="w-full max-w-2xl flex flex-col gap-4">
					<p className="text-md font-semibold">Layout</p>
					<div className="flex w-full h-full items-center gap-2">
						{layoutOption[selectedPage - 1].map((layout) => (
							<LayoutPreview
								key={layout}
								layout={layout}
								isSelected={selectedLayout === layout}
								onClick={() => setSelectedLayout(layout)}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export const Step3 = () => {
	const { checkoutConfig, logoFile, productFiles } = useContext(configContext);
	const [activeTab, setActiveTab] = useState('product');
	const { getToken } = useAuth();
	const router = useRouter();
	const tabs = [
		{ id: 'product', label: 'Product', icon: '📦' },
		{ id: 'checkout', label: 'Checkout', icon: '💳' },
		{ id: 'design', label: 'Design', icon: '🎨' },
		{ id: 'afterpayment', label: 'After Payment', icon: '✅' },
	];

	const getPreSignedUrlAndUpload = async (file: File): Promise<string> => {
		const res = await axios.get(
			`/api/v1/upload?filename=${encodeURIComponent(file.name)}`
		);

		const { url, key } = res.data;

		await axios.put(url, file, {
			headers: { 'Content-Type': file.type },
		});

		return `https://checkoutpageclone.s3.ap-south-1.amazonaws.com/${key}`;
	};
	const handleSave = async () => {
		const updatedConfig = { ...checkoutConfig };
		try {
			const token = await getToken();

			const headers = {
				headers: {
					'Content-Type': 'application/json',
					...(token && { Authorization: `Bearer ${token}` }),
				},
			};

			if (checkoutConfig.logoUrl.startsWith('blob:') && logoFile) {
				updatedConfig.logoUrl = await getPreSignedUrlAndUpload(logoFile);
			}

			updatedConfig.productImages = await Promise.all(
				checkoutConfig.productImages.map(async (url, idx) => {
					if (url.startsWith('blob:') && productFiles[idx]) {
						return await getPreSignedUrlAndUpload(productFiles[idx]);
					}
					return url;
				})
			);
			const response = await axios.post(
				'/api/v1/config',
				updatedConfig,
				headers
			);
			router.push('/dashboard');

			console.log('Config saved', response.data);
		} catch (error) {
			console.error('❌ Save failed:', error);
		}
	};

	const renderSidebar = () => {
		switch (activeTab) {
			case 'product':
				return <ProductSidebar />;
			case 'checkout':
				return <CheckoutSidebar />;
			case 'design':
				return <DesignSidebar />;
			case 'afterpayment':
				return <AfterPaymentSidebar />;
			default:
				return null;
		}
	};

	const renderPreview = () => {
		if (activeTab === 'afterpayment') {
			return <AfterPaymentPreview />;
		}
		const style = {
			'--primary': checkoutConfig.brandColors.primary,
			'--secondary': checkoutConfig.brandColors.secondary,
			'--accent': checkoutConfig.brandColors.accent,
			'--background': checkoutConfig.brandColors.background,
			'--text': checkoutConfig.brandColors.text,
		} as React.CSSProperties;

		if (checkoutConfig.selectedLayout === 1) {
			return (
				<div
					className="flex justify-center items-center min-h-screen bg-gray-50 p-4"
					style={style}
				>
					<CheckoutForm />
				</div>
			);
		} else if (checkoutConfig.selectedLayout === 2) {
			return (
				<div
					className="min-h-screen bg-gray-50 grid grid-cols-1 lg:grid-cols-2"
					style={style}
				>
					<div className="bg-white p-8 flex flex-col justify-center">
						<ProductInfo />
					</div>
					<div className="p-8 flex items-center justify-center">
						<CheckoutForm />
					</div>
				</div>
			);
		} else {
			return (
				<div
					className="min-h-screen grid grid-cols-1 lg:grid-cols-2"
					style={style}
				>
					<div
						className="p-8 flex flex-col justify-center text-white"
						style={{ backgroundColor: checkoutConfig.brandColors.primary }}
					>
						<ProductInfo isLight={false} />
					</div>
					<div className="bg-white p-8 flex items-center justify-center">
						<CheckoutForm />
					</div>
				</div>
			);
		}
	};

	return (
		<div className="w-full h-screen flex flex-col">
			{/* Top Navigation */}
			<div className="bg-background border-b px-6 py-3 ">
				<div className="flex justify-between items-center">
					<div className="flex space-x-8">
						{tabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
									activeTab === tab.id
										? 'bg-primary text-primary-foreground'
										: 'text-muted-foreground hover:text-foreground hover:bg-muted'
								}`}
							>
								<span>{tab.icon}</span>
								<span className="font-medium">{tab.label}</span>
							</button>
						))}
					</div>
					<Button className="cursor-pointer" onClick={handleSave}>
						Save
					</Button>
				</div>
			</div>

			<div className="flex-1 flex">
				{/* Sidebar */}
				<div className="w-80 bg-background border-r overflow-y-auto">
					{renderSidebar()}
				</div>

				{/* Preview */}
				<div className="flex-1 bg-muted-foreground overflow-auto">
					<style
						dangerouslySetInnerHTML={{ __html: checkoutConfig.customCSS }}
					/>
					{renderPreview()}
				</div>
			</div>
		</div>
	);
};

Step1.displayName = 'Step1';
Step2.displayName = 'Step2';
Step3.displayName = 'Step3';
