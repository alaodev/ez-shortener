import { z } from 'zod';

export const deleteUserUrlResponseSchema = z.object({
  id: z.string(),
});

export type DeleteUserUrlResponse = z.infer<typeof deleteUserUrlResponseSchema>;
