import { z } from 'zod';

export const shortenUrlRequestBodySchema = z.object({
  originalUrl: z
    .string({ message: 'field is required' })
    .url({ message: 'invalid url format' }),
});

export const shortenUrlResponseSchema = z.object({
  id: z.string(),
  originalUrl: z.string(),
  shortId: z.string(),
  owner: z.string(),
});

export type ShortenUrlRequestBody = z.infer<typeof shortenUrlRequestBodySchema>;

export type ShortenUrlResponse = z.infer<typeof shortenUrlResponseSchema>;
