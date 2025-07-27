import { headers } from 'next/headers';
import {connectToDatabase} from "./moongose"
import ConfigModel, { IConfig } from "../model/config"
import Analytics, { IAnalytics } from '@/model/analytics';
import mongoose from 'mongoose';
export async function getSubdomain(): Promise<string | null> {
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
export async function getConfigFromDbThroughConfigId(config_id: mongoose.Types.ObjectId): Promise<IConfig | null> {
	try {
		await connectToDatabase();
		const config = await ConfigModel.findById(config_id) as IConfig | null;
		if (!config) return null;
		const configSafe = config.toObject();
		return JSON.parse(JSON.stringify(configSafe));
	} catch (error) {
		console.error("Error fetching config from DB:", error);
		return null;
	}
}

export async function getConfigFromDbThroughUserId(userId: string): Promise<IConfig[] | null> {
	try {
		await connectToDatabase();
		const configs = await ConfigModel.find({userId}) as IConfig[];
		if(!configs) return null;
		const configsSafe = configs.map((config) => {
			return config.toObject();
		} )
		return JSON.parse(JSON.stringify(configsSafe));
	} catch (error) {
		console.error("Error fetching config from DB:", error);
		return null;
	}
}

export async function getAnalyticsFromDb(config_id: string): Promise<IAnalytics[]> {
	try {
		await connectToDatabase();
		const analytics = await Analytics.find({ config_id }) as IAnalytics[];
		const analyticsSafe = analytics.map((data) => data.toObject());
		return JSON.parse(JSON.stringify(analyticsSafe));
	} catch (error) {
		console.error("Error fetching analytics from DB:", error);
		return [];
	}
}
