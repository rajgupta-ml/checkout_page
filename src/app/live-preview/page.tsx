import ProductInfo from '@/components/ui/Previews/ProductInfoPreview';
import CheckoutForm from '@/components/ui/Previews/CheckoutFormPreview';
import { getConfigFromDbThroughConfigId, getSubdomain} from "../../lib/getSubdomain"
import mongoose from 'mongoose';

export default async function SubdomainCheckoutPage() {
	const subdomain = await getSubdomain();

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
	const config = await getConfigFromDbThroughConfigId(new mongoose.Types.ObjectId(subdomain));
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
				<CheckoutForm config_id = {subdomain} dbConfig={config} livePreview = {true}/>
			</div>
		);
	} else if (config.selectedLayout === 2) {
		return (
			<div className="min-h-screen bg-gray-50 grid grid-cols-1 lg:grid-cols-2">
				<div className="bg-white p-8 flex flex-col justify-center">
					<ProductInfo dbConfig={config} />
				</div>
				<div className="p-8 flex items-center justify-center">
					<CheckoutForm config_id = {subdomain} dbConfig={config} livePreview = {true}/>
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
					<CheckoutForm config_id = {subdomain} dbConfig={config} livePreview = {true}/>
				</div>
			</div>
		);
	}
}
