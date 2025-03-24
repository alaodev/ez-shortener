import { z } from 'zod';

export const findAllUserUrlsResponseSchema = z.array(
  z.object({
    id: z.string(),
    originalUrl: z.string(),
    shortId: z.string(),
    owner: z.string(),
  }),
);

export type FindAllUserUrlsResponse = z.infer<
  typeof findAllUserUrlsResponseSchema
>;
