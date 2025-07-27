import { PagesDashboard } from "@/components/ui/dashboard/page-dashboard";
import { getAnalyticsFromDb, getConfigFromDbThroughUserId } from "@/lib/getSubdomain";
import { connectToDatabase } from "@/lib/moongose";
import Analytics, { IAnalytics } from "@/model/analytics";
import { IConfig } from "@/model/config";
import { auth } from "@clerk/nextjs/server";

export interface PagesData {
	id: string;
	type: string;
	name: string;
	price: string;
	originalPrice?: string;
	revenue: string;
	payments: number;
	views: number;
	cvr: string;
	createdAt: string;
}


function generatePagesData(configs: (IConfig | null)[], analytics: IAnalytics[] = []): PagesData[] {
	return configs
		.map((config) => {
			if (!config) return null;

			const relatedAnalytics = analytics.filter(
				(a) => a.config_id === config._id.toString()
			);

			const totalRevenue = relatedAnalytics.reduce((sum, a) => sum + (a.revenue || 0), 0);
			const totalPayments = relatedAnalytics.reduce((sum, a) => sum + (a.payment || 0), 0);
			const totalViews = relatedAnalytics.reduce((sum, a) => sum + (a.pageView || 0), 0);
			const conversion = relatedAnalytics.reduce((sum, a) => sum + (Number(a.conversion) || 0), 0);
			const cvr = totalViews > 0 ? ((conversion / totalViews) * 100).toFixed(1) + "%" : "0%";

			return {
				id: config._id.toString(),
				type: "Checkout",
				name: config.productTitle,
				price: `$${config.price.toFixed(2)}`,
				originalPrice:
					config.originalPrice !== config.price
						? `$${config.originalPrice.toFixed(2)}`
						: undefined,
				revenue: `$${totalRevenue.toFixed(2)}`,
				payments: totalPayments,
				views: totalViews,
				cvr,
				createdAt: config.createdAt
					? new Date(config.createdAt).toISOString()
					: new Date().toISOString(),
			};
		})
		.filter(Boolean) as PagesData[];
}

export default async function Page() {
	const { userId } = await auth();
	if (!userId) return <div>Unauthorized</div>;

	const configs = await getConfigFromDbThroughUserId(userId.toLowerCase()) as IConfig[];

	// If no configs, directly return
	if (!configs.length) return <PagesDashboard pagesData={[]} />;

	// Get analytics per config
	const analyticsNested = await Promise.all(
		configs.map((config) => getAnalyticsFromDb(config._id.toString()))
	);

	const analytics = analyticsNested.flat();

	const pagesData = generatePagesData(configs, analytics);

	return <PagesDashboard pagesData={pagesData} />;
}
