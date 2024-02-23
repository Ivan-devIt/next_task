import { envSchema } from '.';

export const config = {
  env: envSchema.parse(process.env)
};
