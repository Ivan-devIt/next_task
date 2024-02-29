import { userService } from '@/services';

interface I_Params {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: I_Params) {
  return await userService.getUserByUserId(params.id);
}

export async function DELETE(req: Request, { params }: I_Params) {
  return await userService.deleteUserByUserId(params.id);
}
