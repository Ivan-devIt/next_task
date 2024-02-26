import * as zod from 'zod';
import { fieldsOptions } from './fieldOptions';

export const loginShema = zod.object({
  email: fieldsOptions.email,
  password: fieldsOptions.password
});
