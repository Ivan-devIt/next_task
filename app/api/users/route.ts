import { validateBodyMiddleware } from '@/middlewares';
import { userService } from '@/services';
import { userSchema } from '@/utils/validation';

//get all users with pagination, sort and search by keyword (name and email)
export async function GET(req: Request) {
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
