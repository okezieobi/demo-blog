import { AppError } from "../../utils";
import { PostSchema, PostIdSchema } from "./schema";

const PostDB = new Map<string, PostSchema>();

export class PostService {
  constructor(protected arg: unknown) {}

  insert() {
    const id = `${Date.now()}`;
    const input = PostSchema.parse(this.arg);
    const data: PostSchema = {
      id,
      title: input.title,
      content: input.content,
      author: input.author,
      createdAt: new Date(),
      updatedAt: null,
    };
    PostDB.set(id, data);
    return data;
  }

  list() {
    return Array.from(PostDB.values());
  }

  get() {
    const input = PostIdSchema.parse(this.arg);
    const blog = PostDB.get(input.postId);
    if (blog == null) {
      throw new AppError("Blog post not found", { code: 404 });
    }
    return blog;
  }

  protected getByAuthor(id: string, author: string) {
    const data = PostDB.get(id);
    if (data == null) {
      throw new AppError("Blog post not found", { code: 404 });
    }
    if (data.author != author) {
      throw new AppError("Blog post does not belong to author", { code: 409 });
    }
    return data;
  }

  update(filter: unknown) {
    const { postId } = PostIdSchema.parse(filter);
    const input = PostSchema.parse(this.arg);
    const data = this.getByAuthor(postId, input.author);
    data.content = input.content;
    data.title = input.title;
    data.updatedAt = new Date();
    PostDB.set(postId, data);
    return data;
  }

  delete(filter: unknown) {
    const { postId } = PostIdSchema.parse(filter);
    const input = PostSchema.pick({ author: true }).parse(this.arg);
    const data = this.getByAuthor(postId, input.author);
    PostDB.delete(data.id);
  }
}
