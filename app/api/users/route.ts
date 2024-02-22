import prisma from '@/prisma/client';
import { getPaginataionOptions } from '@/utils/helpers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url!);

    const count = await prisma.user.count();

    const pagination = await getPaginataionOptions({ searchParams, count });

    if (!count)
      return NextResponse.json({
        status: 200,
        pagination,
        data: []
      });

    const users = await prisma.user.findMany({
      where: {},
      take: pagination.skip,
      skip: (pagination.page - 1) * pagination.skip
    });

    return NextResponse.json({
      status: 200,
      pagination,
      data: users
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
