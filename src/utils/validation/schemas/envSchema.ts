import * as zod from 'zod';

export const envSchema = zod.object({
  POSTGRES_USER: zod.string().min(1, 'POSTGRES_USER env is requared!'),
  POSTGRES_PASSWORD: zod.string().min(1, 'POSTGRES_PASSWORD env is requared!'),
  POSTGRES_DB_NAME: zod.string().min(1, 'POSTGRES_DB_NAME env is requared!'),
  DATABASE_URL: zod.string().min(1, 'DATABASE_URL env is requared!'),
  NEXT_PUBLIC_BASE_URL: zod
    .string()
    .min(1, 'NEXT_PUBLIC_BASE_URL env is requared!')
    .url('NEXT_PUBLIC_BASE_URL Invalid URL')
});
