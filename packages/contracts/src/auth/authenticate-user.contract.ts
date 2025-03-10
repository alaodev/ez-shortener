import { z } from 'zod';

export const authenticateUserSchema = z.object({
  email: z
    .string({ message: 'field is required' })
    .email({ message: 'invalid email' }),
  password: z.string({ message: 'field is required' }),
});

export type AuthenticateUserContract = z.infer<typeof authenticateUserSchema>;
