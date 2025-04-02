import { z } from 'zod';

export const findAllUserAccessResponseSchema = z.array(
  z.object({
    id: z.string(),
    address: z.string(),
    browserName: z.string().optional(),
    browserVersion: z.string().optional(),
    osName: z.string().optional(),
    osVersion: z.string().optional(),
    url: z.object({
      id: z.string(),
      originalUrl: z.string(),
      shortId: z.string(),
    }),
    createdAt: z.string(),
  }),
);

export type FindAllUserAccessResponse = z.infer<
  typeof findAllUserAccessResponseSchema
>;
