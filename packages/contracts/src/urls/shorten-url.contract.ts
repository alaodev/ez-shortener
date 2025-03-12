import { z } from 'zod';

export const shortenUrlSchema = z.object({
  originalUrl: z
    .string({ message: 'field is required' })
    .url({ message: 'invalid url format' }),
});

export type ShortenUrlContract = z.infer<typeof shortenUrlSchema>;
