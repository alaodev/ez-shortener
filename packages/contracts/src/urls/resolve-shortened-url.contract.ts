import { z } from 'zod';

export const resolveShortenedUrlResponseSchema = z.object({
  id: z.string(),
  originalUrl: z.string(),
  shortId: z.string(),
  owner: z.string(),
});

export type ResolveShortenedUrlResponse = z.infer<
  typeof resolveShortenedUrlResponseSchema
>;
