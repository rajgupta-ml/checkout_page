import { connectToDatabase } from '@/lib/moongose';
import ConfigModel, { IConfig } from '@/model/config'; // Assuming IConfig is exported from here too
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		await connectToDatabase();
		const { userId } = await auth(); // 👈 Get Clerk userId
		if (!userId) {
			return NextResponse.json(
				{ success: false, message: 'Unauthorized' },
				{ status: 401 }
			);
		}

		const data: IConfig = await req.json();
		if (!data || Object.keys(data).length === 0) {
			return NextResponse.json(
				{
					success: false,
					message: 'No data provided or config is empty.',
				},
				{ status: 400 }
			);
		}

		const newConfig = await ConfigModel.create({ ...data, userId });

		return NextResponse.json({
			success: true,
			message: 'Configuration saved successfully!',
			data: newConfig,
		});
	} catch (error) {
		console.error('Error saving config:', error);

		if (error instanceof Error && error.name === 'ValidationError') {
			return NextResponse.json(
				{
					success: false,
					message: 'Validation failed.',
					errors: error,
				},
				{ status: 422 }
			);
		}

		return NextResponse.json(
			{
				success: false,
				message: 'An internal server error occurred.',
			},
			{ status: 500 }
		);
	}
}
