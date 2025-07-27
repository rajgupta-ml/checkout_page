import AfterPaymentPreview from '@/components/ui/Previews/AfterPaymentPreview'
import {  getConfigFromDbThroughConfigId, getSubdomain } from '@/lib/getSubdomain';
import mongoose from 'mongoose';
import React from 'react'

const Page = async () => {


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

  return (

    <AfterPaymentPreview dbConfig={config}></AfterPaymentPreview>
  )
}

export default Page