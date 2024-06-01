import { Router } from "express";
import { postRouter } from "./post";

export const router = Router();

router.use("/posts", postRouter);
