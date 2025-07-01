import { z } from 'zod';

export const baseNodeDataSchema = z.object({
  loading: z.boolean().optional(),
  output: z.string().optional(),
  error: z.string().optional(),
  dirty: z.boolean().optional(),
});

export type BaseNodeData = z.infer<typeof baseNodeDataSchema>;