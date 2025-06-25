import { S3Client } from '@aws-sdk/client-s3';

const getS3Client = () => {
	return new S3Client({
		region: process.env.REGION!,
		credentials: {
			accessKeyId: process.env.ACCESS_KEY_ID!,
			secretAccessKey: process.env.SECRET_ACCESS_KEY!,
		},
	});
};

export default getS3Client;
