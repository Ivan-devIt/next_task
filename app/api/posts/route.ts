// import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/client';
import { NextResponse } from 'next/server';
// import type {Request} from 'next/server'

// export async function GET(req: Request) {
// 	return NextResponse.json({ message: 'hellow !' });
// }

// export async function GET(req: Request) { //TODO
// 	const data = await prisma.post.findMany({});

// 	return NextResponse.json(data);
// }

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url!);
		console.log('===req.url====', req.url);
		console.log('==searchParams====', searchParams.get('q'));

		const data = await prisma.post.findMany({});

		// throw new Error('Some thing wrong!');

		return NextResponse.json({ status: 200, data });
	} catch (err) {
		// FIX
		return NextResponse.json({ status: 500, message: err.message }); //TODO
	}
}

// export async function GET(req: Request) {
// 	try {
// 		const { searchParams } = new URL(req.url!);
// 		console.log('===req.url====', req.url);
// 		console.log('==searchParams====', searchParams.get('q'));

// 		const data = await prisma.post.findMany({});

// 		// throw new Error('sdadasd asdsadad asd dads asd asd');

// 		return NextResponse.json(data);
// 	} catch (err) {
// 		return NextResponse.json({ status: 500, message: err.message });
// 	}
// }
