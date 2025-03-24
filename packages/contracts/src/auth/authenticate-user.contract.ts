import { z } from 'zod';

export const authenticateUserRequestBodySchema = z.object({
  email: z
    .string({ message: 'field is required' })
    .email({ message: 'invalid email' }),
  password: z.string({ message: 'field is required' }),
});

export const authenticateUserResponseSchema = z.object({
  accessToken: z.string(),
});

export type AuthenticateUserRequestBody = z.infer<
  typeof authenticateUserRequestBodySchema
>;

export type AuthenticateUserResponse = z.infer<
  typeof authenticateUserResponseSchema
>;
