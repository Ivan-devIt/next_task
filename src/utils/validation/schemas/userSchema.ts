import * as zod from 'zod';
import { fieldsOptions } from './fieldOptions';

export const userSchema = zod.object({
  name: fieldsOptions.name,
  email: fieldsOptions.email,
  password: fieldsOptions.password,
  role: fieldsOptions.role
});
