import { AppError } from "../../utils";
import { BlogSchema, BlogIdSchema } from "./schema";

const BlogDB: BlogSchema[] = [];

export class BlogService {
  constructor(protected arg: unknown) {}

  insert() {
    const input = BlogSchema.parse(this.arg);
    const data: BlogSchema = {
      id: BlogDB.length,
      title: input.title,
      content: input.content,
      author: input.author,
      createdAt: new Date(),
      updatedAt: null,
    };
    BlogDB.push(data);
    return data;
  }

  list() {
    return BlogDB;
  }

  get() {
    const input = BlogIdSchema.parse(this.arg);
    const blog = BlogDB.find((blog) => blog.id == input.id);
    if (blog == null) {
      throw new AppError("Blog not found", { code: 404 });
    }
    return blog;
  }

  protected getByAuthor(id: number, author: string) {
    const data = BlogDB.find((blog) => blog.author == author && blog.id == id);
    if (data == null) {
      throw new AppError("Blog not found", { code: 404 });
    }
    return data;
  }

  update(filter: unknown) {
    const { id } = BlogIdSchema.parse(filter);
    const input = BlogSchema.parse(this.arg);
    const data = this.getByAuthor(id, input.author);
    data.content = input.content;
    data.title = input.title;
    data.updatedAt = new Date();
    BlogDB.splice(data.id, 1, data);
    return data;
  }

  delete() {
    const { id } = BlogIdSchema.parse(this.arg);
    const input = BlogSchema.pick({ author: true }).parse(this.arg);
    const data = this.getByAuthor(id, input.author);
    BlogDB.splice(data.id, 1);
  }
}
