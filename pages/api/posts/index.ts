import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/client';

export default async function getAllPosts(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		return res.status(400).json({ message: 'Not correct request method' });
	}

	try {
		const data = await prisma.post.findMany({
			// include: {
			//   user: true,
			//   comments: true,
			//   hearts: true,
			// },
			// orderBy: {
			//   createdAt: "desc",
			// },
		});
		// console.log('===data===', data);

		return res.status(200).json(data);
	} catch (err) {
		return res
			.status(403)
			.json({ err: 'Error has occured while making a post' });
	}
}
