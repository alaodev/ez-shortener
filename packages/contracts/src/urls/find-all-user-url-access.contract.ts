import { z } from 'zod';

export const findAllUserUrlAccessResponseSchema = z.array(
  z.object({
    id: z.string(),
    address: z.string(),
    createdAt: z.string(),
  }),
);

export type FindAllUserUrlAccessResponse = z.infer<
  typeof findAllUserUrlAccessResponseSchema
>;
