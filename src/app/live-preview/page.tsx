import { connectToDatabase } from '@/lib/moongose';
import ConfigModel from '@/model/config';
import { CheckoutConfig } from '../Provider/configProvider';
import ProductInfo from '@/components/ui/Previews/ProductInfoPreview';
import { headers } from 'next/headers';
import CheckoutForm from '@/components/ui/Previews/CheckoutFormPreview';

async function getSubdomain(): Promise<string | null> {
	const headersList = await headers();
	const host = headersList.get('host');
	if (!host) return null;

	// Assuming .localhost:3000 or a real domain like .mycheckout.com
	const parts = host.split('.');
	if (host.includes('localhost')) {
		return parts.length >= 2 ? parts[0] : null;
	} else {
		return parts.length >= 3 ? parts[0] : null;
	}
}

async function getConfigFromDb(
	subdomain: string
): Promise<CheckoutConfig | null> {
	try {
		await connectToDatabase();

		const configDoc = await ConfigModel.findOne({
			userId: { $regex: `^${subdomain}$`, $options: 'i' },
		});

		if (configDoc) {
			const config = configDoc.toObject();
			return JSON.parse(JSON.stringify(config));
		}

		return null;
	} catch (error) {
		console.error('Error fetching config from DB:', error);
		return null;
	}
}

// This is a Server Component
export default async function SubdomainCheckoutPage() {
	const subdomain = await getSubdomain();

	console.log(subdomain === 'user_2yxrWTfDfKgdLcLLDcgpEUQkt4b');
	if (!subdomain) {
		return (
			<div className="flex justify-center items-center h-screen text-red-500">
				<p>
					Error: Checkout configuration not found for &quot;{subdomain}. Please
					check the URL.
				</p>
			</div>
		);
	}
	console.log(subdomain);
	const config = await getConfigFromDb(subdomain);
	if (!config) {
		return (
			<div className="flex justify-center items-center h-screen text-red-500">
				<p>
					Error: Checkout configuration not found for &quot;{subdomain}. Please
					check the URL.
				</p>
			</div>
		);
	}

	if (config.selectedLayout === 1) {
		return (
			<div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
				<CheckoutForm dbConfig={config} />
			</div>
		);
	} else if (config.selectedLayout === 2) {
		return (
			<div className="min-h-screen bg-gray-50 grid grid-cols-1 lg:grid-cols-2">
				<div className="bg-white p-8 flex flex-col justify-center">
					<ProductInfo dbConfig={config} />
				</div>
				<div className="p-8 flex items-center justify-center">
					<CheckoutForm dbConfig={config} />
				</div>
			</div>
		);
	} else {
		return (
			<div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
				<div
					className="p-8 flex flex-col justify-center text-white"
					style={{ backgroundColor: config.brandColors.primary }}
				>
					<ProductInfo isLight={false} dbConfig={config} />
				</div>
				<div className="bg-white p-8 flex items-center justify-center">
					<CheckoutForm dbConfig={config} />
				</div>
			</div>
		);
	}
}
