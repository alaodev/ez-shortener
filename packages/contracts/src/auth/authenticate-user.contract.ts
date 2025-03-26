import { z } from 'zod';

export const authenticateUserRequestBodySchema = z.object({
  email: z
    .string({ message: 'field is required' })
    .email({ message: 'invalid email' }),
  password: z.string({ message: 'field is required' }),
});

export type AuthenticateUserRequestBody = z.infer<
  typeof authenticateUserRequestBodySchema
>;
