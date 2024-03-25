import { validateBodyMiddleware } from '@/middlewares';
import { userService } from '@/services';
import { forbiddenResponse } from '@/utils';
import { userSchema } from '@/utils/validation';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

//get all users with pagination, sort and search by keyword (name and email)
export async function GET(req: NextRequest) {
  const cookies = req.cookies.getAll();

  if (!cookies.length) {
    const tokenSession = req.headers.get('tokenSession');

    if (tokenSession) {
      req.cookies.set({
        name: 'next-auth.session-token',
        value: String(tokenSession)
      });
    }
  }

  const token = await getToken({ req });

  // console.log('===token===', token);

  if (!token) {
    console.log('===token=failed==');
    return forbiddenResponse();
  }

  return await userService.getUsers(req);
}

//create new user
export async function POST(req: Request) {
  return await validateBodyMiddleware(
    req,
    userSchema,
    async body => await userService.createUser(req, body)
  );
}
