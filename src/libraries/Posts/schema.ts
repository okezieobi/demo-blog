import { z } from "zod";

export const PostSchema = z.object({
  title: z.string(),
  content: z.string(),
  author: z.string(),
});

export interface PostSchema extends z.infer<typeof PostSchema> {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export const PostIdSchema = z.object({
  postId: z.string(),
});
