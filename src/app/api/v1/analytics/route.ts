// app/api/v1/analytics/route.ts
import { connectToDatabase } from '@/lib/moongose';
import { NextRequest, NextResponse } from 'next/server';
import Analytics from '@/model/analytics';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle preflight
export async function OPTIONS() {
	return new NextResponse(null, {
		status: 204,
		headers: corsHeaders,
	});
}

// POST /api/v1/analytics
export async function POST(req: NextRequest) {
	try {
		await connectToDatabase();
		const body = await req.json();
		const created = await Analytics.create(body);

		return new NextResponse(JSON.stringify({ success: true, created }), {
			status: 201,
			headers: corsHeaders,
		});
	} catch (error) {
		console.error('POST error:', error);
		return new NextResponse(JSON.stringify({ success: false, error: 'Failed to save analytics' }), {
			status: 500,
			headers: corsHeaders,
		});
	}
}

// GET /api/v1/analytics?user_id=abc
export async function GET(req: NextRequest) {
	try {
		await connectToDatabase();
		const { searchParams } = new URL(req.url);
		const user_id = searchParams.get('user_id');
		const query = user_id ? { user_id } : {};
		const analytics = await Analytics.find(query).sort({ createdAt: -1 });

		return new NextResponse(JSON.stringify({ success: true, analytics }), {
			status: 200,
			headers: corsHeaders,
		});
	} catch (error) {
		console.error('GET error:', error);
		return new NextResponse(JSON.stringify({ success: false, error: 'Failed to fetch analytics' }), {
			status: 500,
			headers: corsHeaders,
		});
	}
}
