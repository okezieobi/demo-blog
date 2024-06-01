import { Router } from "express";
import { BlogService } from "../../../libraries";

export const blogRouter = Router();

blogRouter
  .route("/")
  .post((req, res, next) => {
    try {
      const data = new BlogService(req.body).insert();
      res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  })
  .get((req, res, next) => {
    try {
      const data = new BlogService({}).list();
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  });

blogRouter
  .route("/:id")
  .get((req, res, next) => {
    try {
      const data = new BlogService(req.params).get();
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  })
  .patch((req, res, next) => {
    try {
      const data = new BlogService(req.body).update(req.params);
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  })
  .delete((req, res, next) => {
    try {
      new BlogService(req.params).delete();
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });
