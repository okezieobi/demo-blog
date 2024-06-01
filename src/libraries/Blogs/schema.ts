import { z } from "zod";

export const BlogSchema = z.object({
  title: z.string(),
  content: z.string(),
  author: z.string(),
});

export interface BlogSchema extends z.infer<typeof BlogSchema> {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
}

export const BlogIdSchema = z.object({
  id: z.number(),
});
