import prisma from '@/prisma/client';
import { E_MessageStatus } from '@/types';
import { NextResponse } from 'next/server';

interface I_Params {
  params: {
    id: string;
  };
}

interface I_SuccessResponse {
  data: unknown;
  message?: E_MessageStatus;
  status?: number;
}

export async function GET(req: Request, { params }: I_Params) {
  const id = params.id;

  const user = await findUserById(id);

  if (!user) return notFoundUserResponse(id);

  return successResponse({ data: user });
}

export async function DELETE(req: Request, { params }: I_Params) {
  const id = params.id;

  const user = await findUserById(id);

  if (!user) return notFoundUserResponse(id);

  const deletedUser = await deleteUserById(id);

  return successResponse({
    data: deletedUser,
    message: E_MessageStatus.deleted
  });
}

async function findUserById(id: number | string) {
  return await prisma.user.findUnique({ where: { id: Number(id) } });
}

async function deleteUserById(id: number | string) {
  return await prisma.user.delete({ where: { id: Number(id) } });
}

async function notFoundUserResponse(id: string | number) {
  return NextResponse.json({
    status: 404,
    message: `User with id:${id} is not found!`,
    data: null
  });
}

async function successResponse({
  data,
  message,
  status = 200
}: I_SuccessResponse) {
  return NextResponse.json({
    status,
    message: !!message ? message : E_MessageStatus.success,
    data
  });
}
