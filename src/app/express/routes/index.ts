import { Router } from "express";
import { blogRouter } from "./blog";

export const router = Router();

router.use("/post", blogRouter);
