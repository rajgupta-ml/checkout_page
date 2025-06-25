import { configContext } from '@/app/Provider/configProvider';
import Image from 'next/image';
import { useContext } from 'react';

// Product Info Component
interface IProductInfo {
	isLight?: boolean;
}

const ProductInfo = ({ isLight = true }: IProductInfo) => {
	const textColor = isLight ? 'text-gray-900' : 'text-white';
	const subtextColor = isLight ? 'text-gray-600' : 'text-white/80';
	const { checkoutConfig: config } = useContext(configContext);

	return (
		<div className="max-w-md">
			<Image
				src={config.logoUrl || '/placeholder.svg'}
				alt="Logo"
				className="w-16 h-16 rounded-lg mb-4"
			/>
			<h1 className={`text-3xl font-bold mb-2 ${textColor}`}>
				{config.productTitle}
			</h1>
			<div className="flex items-center space-x-2 mb-4">
				<span className={`text-2xl font-bold ${textColor}`}>
					${config.price}
				</span>
				{config.originalPrice > config.price && (
					<span className={`text-lg line-through ${subtextColor}`}>
						${config.originalPrice}
					</span>
				)}
			</div>
			<p className={`${subtextColor} mb-4`}>{config.description}</p>
			<div className="grid grid-cols-2 gap-2">
				{config.productImages &&
					config.productImages
						.slice(0, 2)
						.map((image: string, index: number) => (
							<Image
								key={index}
								src={image || '/placeholder.svg'}
								alt={`Product ${index + 1}`}
								className="w-full h-24 object-cover rounded-lg"
							/>
						))}
			</div>
		</div>
	);
};

export default ProductInfo;
