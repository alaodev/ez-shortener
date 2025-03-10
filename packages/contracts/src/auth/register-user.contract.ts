import { z } from 'zod';

export const registerUserSchema = z
  .object({
    username: z
      .string({ message: 'field is required' })
      .min(3, { message: 'field must contain at least 3 characters' })
      .max(32, { message: 'field must contain a maximum of 32 characters' }),
    email: z
      .string({ message: 'field is required' })
      .email({ message: 'invalid email' }),
    password: z
      .string({ message: 'field is required' })
      .min(8, { message: 'field must contain at least 5 characters' })
      .max(32, { message: 'field must contain a maximum of 32 characters' })
      .regex(/[a-z]/, 'field must contain at least one lowercase letter')
      .regex(/[A-Z]/, 'field must contain at least one uppercase letter')
      .regex(/\d/, 'field must contain at least one number')
      .regex(/[\W_]/, 'field must contain at least one special character'),
    passwordConfirmation: z.string({
      message: 'field is required',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'field must match (password)',
    path: ['passwordConfirmation'],
  });

export type RegisterUserContract = z.infer<typeof registerUserSchema>;
