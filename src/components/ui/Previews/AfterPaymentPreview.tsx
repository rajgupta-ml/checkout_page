"use client"
import { CheckoutConfig, configContext } from '@/app/Provider/configProvider';
import { useContext } from 'react';
import { Card, CardContent } from '../card';
import { Button } from '../button';

const AfterPaymentPreview = ({dbConfig} : {dbConfig? : CheckoutConfig}) => {
	const { checkoutConfig} = useContext(configContext);
	const config = dbConfig ?? checkoutConfig
	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
			<Card className="w-full max-w-2xl">
				<CardContent className="p-8 text-center">
					<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
						<svg
							className="w-8 h-8 text-green-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>

					<h1 className="text-3xl font-bold mb-4">
						{config.afterPayment.title}
					</h1>
					<p className="text-gray-600 mb-6">
						{config.afterPayment.description}
					</p>

					{config.afterPayment.customMessage && (
						<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
							<p className="text-blue-800">
								{config.afterPayment.customMessage}
							</p>
						</div>
					)}

					{config.afterPayment.showOrderSummary && (
						<div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
							<h3 className="font-semibold mb-3">Order Summary</h3>
							<div className="flex justify-between items-center mb-2">
								<span>{config.productTitle}</span>
								<span>${config.price}</span>
							</div>
							<div className="border-t pt-2 flex justify-between items-center font-semibold">
								<span>Total</span>
								<span>${config.price}</span>
							</div>
						</div>
					)}

					{config.afterPayment.enableEmailConfirmation && (
						<div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-6">
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
							<span>Confirmation email sent</span>
						</div>
					)}

					{config.afterPayment.redirectUrl && (
						<Button className="w-full">Continue to Website</Button>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default AfterPaymentPreview;
