// src/lib/mongoose.ts
import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
	throw new Error('❌ MONGODB_URI is not defined in environment variables');
}

// Define a cache type for reuse
type MongooseCache = {
	conn: Mongoose | null;
	promise: Promise<Mongoose> | null;
};

declare global {
	var mongooseCache: MongooseCache;
}

const globalCache: MongooseCache = globalThis.mongooseCache || {
	conn: null,
	promise: null,
};

if (!globalThis.mongooseCache) {
	globalThis.mongooseCache = globalCache;
}

export async function connectToDatabase(): Promise<Mongoose> {
	if (globalCache.conn) return globalCache.conn;

	if (!globalCache.promise) {
		globalCache.promise = mongoose.connect(MONGODB_URI, {
			dbName: 'checkout_app',
			bufferCommands: false,
		});
	}

	globalCache.conn = await globalCache.promise;
	return globalCache.conn;
}
