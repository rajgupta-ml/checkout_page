import { configContext } from '@/app/Provider/configProvider';
import { ChangeEvent, useContext, useRef, useState } from 'react';
import { Label } from '../label';
import { Input } from '../input';
import { Button } from '../button';
import { Switch } from '../switch';
import { Plus } from 'lucide-react';
import Image from 'next/image';

const ProductSidebar = () => {
	const [showProductImages, setShowProductImages] = useState(true);
	const inputRef = useRef<HTMLInputElement>(null);
	const productInputRef = useRef<HTMLInputElement>(null);
	const { checkoutConfig: config, setCheckoutConfig: setConfig } =
		useContext(configContext);

	const handleProductFileSave = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const url = URL.createObjectURL(file);

			setConfig((prev) => ({
				...prev,
				productImages: [...prev.productImages, url],
			}));
		}
	};

	const handleFileSave = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			console.log('selected File');
			const url = URL.createObjectURL(file);

			setConfig((prev) => ({
				...prev,
				logoUrl: url,
			}));
		}
	};

	return (
		<div className="p-6 space-y-6 text-foreground">
			<div>
				<h2 className="text-lg font-semibold mb-4">Product Details</h2>
			</div>

			<div className="space-y-4">
				<div className="flex flex-col gap-2">
					<Label htmlFor="productTitle">Product Title</Label>
					<Input
						id="productTitle"
						value={config.productTitle}
						onChange={(e) =>
							setConfig((prev) => ({
								...prev,
								productTitle: e.target.value,
							}))
						}
					/>
				</div>

				<div className="grid grid-cols-2 gap-3">
					<div className="flex flex-col gap-2">
						<Label htmlFor="price">Price</Label>
						<Input
							id="price"
							type="number"
							step="0.01"
							value={config.price}
							onChange={(e) =>
								setConfig((prev) => ({
									...prev,
									price: Number.parseFloat(e.target.value),
								}))
							}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="originalPrice">Original Price</Label>
						<Input
							id="originalPrice"
							type="number"
							step="0.01"
							value={config.originalPrice}
							onChange={(e) =>
								setConfig((prev) => ({
									...prev,
									originalPrice: Number.parseFloat(e.target.value),
								}))
							}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="currency">Currency</Label>
					<select
						id="currency"
						value={config.currency}
						onChange={(e) =>
							setConfig((prev) => ({ ...prev, currency: e.target.value }))
						}
						className="w-full p-2 border rounded-md"
					>
						<option value="USD">USD ($)</option>
						<option value="EUR">EUR (€)</option>
						<option value="GBP">GBP (£)</option>
						<option value="JPY">JPY (¥)</option>
					</select>
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="description">Description</Label>
					<textarea
						id="description"
						value={config.description}
						onChange={(e) =>
							setConfig((prev) => ({
								...prev,
								description: e.target.value,
							}))
						}
						className="w-full p-2 border rounded-md h-24 resize-none"
						placeholder="Describe your product..."
					/>
				</div>
			</div>

			<div className="space-y-4">
				<h3 className="font-semibold">Image Gallery</h3>

				<div>
					<Label>Logo</Label>
					<div className="mt-2 border-2 border-dashed border-border rounded-lg p-4 text-center">
						<Image
							src={config.logoUrl || '/placeholder.svg'}
							alt="Logo"
							className="w-16 h-16 mx-auto mb-2 rounded"
						/>
						<input
							ref={inputRef}
							type="file"
							accept="image/*"
							onChange={handleFileSave}
							className="hidden"
						/>
						<Button
							onClick={() => inputRef!.current!.click()}
							size={'sm'}
							variant={'outline'}
						>
							Upload Logo
						</Button>
					</div>
				</div>

				<div className="flex flex-col gap-4 w-full">
					<div className="flex gap-2">
						<Switch
							id="product-images"
							checked={showProductImages}
							onCheckedChange={setShowProductImages}
						/>
						<Label htmlFor="airplane-mode">Product Images</Label>
					</div>
					{showProductImages && (
						<div className="w-full">
							<Label>Product Images</Label>
							<div className="mt-2 grid grid-cols-2 gap-2">
								{config.productImages.map((image: string, index: number) => (
									<div key={index} className="border rounded-lg p-2">
										<Image
											src={image || '/placeholder.svg'}
											alt={`Product ${index + 1}`}
											className="w-full h-20 object-cover rounded"
										/>
									</div>
								))}
								<div className="border-2 border-dashed border-border rounded-lg p-4 flex items-center justify-center">
									<input
										ref={productInputRef}
										type="file"
										accept="image/*"
										multiple={true}
										onChange={handleProductFileSave}
										className="hidden"
									/>
									<Button
										variant="outline"
										size="sm"
										onClick={() => productInputRef.current?.click()}
									>
										<Plus className="w-4 h-4 mr-1" />
										Add Image
									</Button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductSidebar;
