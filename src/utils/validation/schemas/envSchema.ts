import * as zod from 'zod';

export const envSchema = zod.object({
  POSTGRES_USER: zod.string().min(1, 'POSTGRES_USER env is requared!'),
  POSTGRES_PASSWORD: zod.string().min(1, 'POSTGRES_PASSWORD env is requared!'),
  POSTGRES_DB_NAME: zod.string().min(1, 'POSTGRES_DB_NAME env is requared!'),
  DATABASE_URL: zod
    .string()
    .min(1, 'DATABASE_URL env is requared!')
    .url('DATABASE_URL env Invalid URL'),
  NEXTAUTH_SECRET: zod
    .string()
    .min(1, 'NEXTAUTH_SECRET env is requared!')
    .max(100, 'NEXTAUTH_SECRET max lenhth is 100 symbols'),
  NEXTAUTH_URL: zod
    .string()
    .min(1, 'NEXTAUTH_URL env is requared!')
    .url('NEXTAUTH_URL env Invalid URL'),
  NEXT_PUBLIC_BASE_URL: zod
    .string()
    .min(1, 'NEXT_PUBLIC_BASE_URL env is requared!')
    .url('NEXT_PUBLIC_BASE_URL env Invalid URL')
});
