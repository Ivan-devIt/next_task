import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';
import * as zod from 'zod';

export const validateBodyMiddleware = async <T>(
  // req: NextApiRequest,
  req: Request,
  schema: zod.ZodSchema<T>,
  next: (body: T) => Promise<NextResponse<unknown>>
) => {
  try {
    const reqBody = await req.json();
    const validatedData = schema.parse(reqBody);
    console.log('==validatedData==', validatedData);

    return await next(validatedData);
  } catch (error) {
    if (error instanceof zod.ZodError) {
      const errorMessages = error.errors.map(err => err.message).join('; ');

      return NextResponse.json(
        { message: errorMessages },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
