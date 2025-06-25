import { PutObjectCommand } from '@aws-sdk/client-s3';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import getS3Client from '@/lib/s3Client';
import { uuid as uuidv4 } from 'uuidv4';
const BUCKET_NAME = process.env.S3_BUCKET_NAME!;

export const GET = async (req: NextRequest) => {
	const { userId } = await auth();

	if (!userId) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}

	const { searchParams } = new URL(req.url);
	const filename = searchParams.get('filename');

	if (!filename) {
		return NextResponse.json(
			{ message: 'Filename is required' },
			{ status: 400 }
		);
	}

	const fileExtension = filename.split('.').pop();
	const uniqueFileName = `${uuidv4()}${userId}.${fileExtension}`;
	const key = `uploads/${uniqueFileName}`;

	const command = new PutObjectCommand({
		Bucket: BUCKET_NAME,
		Key: key,
		ContentType: mimeTypeFromExtension(fileExtension),
	});

	try {
		const s3 = getS3Client();
		const url = await getSignedUrl(s3, command, { expiresIn: 3000 });

		return NextResponse.json({
			url,
			key,
		});
	} catch (error) {
		console.error('❌ Failed to get signed URL:', error);
		return NextResponse.json({ message: 'Server error' }, { status: 500 });
	}
};

function mimeTypeFromExtension(ext?: string): string {
	switch (ext?.toLowerCase()) {
		case 'png':
			return 'image/png';
		case 'jpg':
		case 'jpeg':
			return 'image/jpeg';
		case 'gif':
			return 'image/gif';
		case 'svg':
			return 'image/svg+xml';
		default:
			return 'application/octet-stream';
	}
}
