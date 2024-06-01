import { Router } from "express";
import { PostService } from "../../../libraries";

export const postRouter = Router();

postRouter
  .route("/")
  .post((req, res, next) => {
    try {
      const data = new PostService(req.body).insert();
      res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  })
  .get((req, res, next) => {
    try {
      const data = new PostService({}).list();
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  });

postRouter
  .route("/:id")
  .get((req, res, next) => {
    try {
      const data = new PostService(req.params).get();
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  })
  .patch((req, res, next) => {
    try {
      const data = new PostService(req.body).update(req.params);
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  })
  .delete((req, res, next) => {
    try {
      new PostService(req.params).delete();
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });
