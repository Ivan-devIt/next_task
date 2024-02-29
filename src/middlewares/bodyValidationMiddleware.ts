import { E_MessageStatus } from '@/types';
import * as zod from 'zod';
import { fieldsOptions } from '@/utils/validation/schemas/fieldOptions';
import { badRequestResponse, serverErrorResponse } from '@/utils';
import type { NextResponse } from 'next/server';

export const bodyValidationMiddleware = async <T extends object>(
  req: Request,
  next: (body: T) => Promise<NextResponse<T>>
) => {
  try {
    const reqBody: T = await req.json();

    if (!Object.keys(reqBody).length) {
      return badRequestResponse(E_MessageStatus.notEmptyBody);
    }

    const schema = zod.object(
      Object.keys(reqBody).reduce((res, key) => {
        return { ...res, [key]: fieldsOptions[key] };
      }, {})
    );

    const validatedData = schema.parse(reqBody);

    return await next(validatedData as T);
  } catch (error) {
    if (error instanceof zod.ZodError) {
      const errorMessages = error.errors.map(err => err.message).join('; ');
      return badRequestResponse(errorMessages);
    }
    return serverErrorResponse(error);
  }
};
