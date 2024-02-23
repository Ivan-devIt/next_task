import * as zod from 'zod';

export const userSchema = zod.object({
  name: zod
    .string()
    .min(2, 'Name must have minimum number of characters must be 2')
    .max(60, 'Name must have number of characters should not exceed 60')
    .regex(/^[a-zA-Z0-9]+$/, 'The name contains only letters and numbers.'),
  email: zod
    .string()
    .email('Invalid email')
    .min(4, 'Email must have minimum number of characters must be 4')
    .max(
      100,
      'Email must have maximum number of characters should not exceed 100'
    ),
  password: zod
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+\\\|\[\]{};:'",.<>/?]).{8,20}$/,
      'The password must contain at least one lowercase and uppercase letter, number and special character, minimum 8 and maximum 20 characters'
    )
});
