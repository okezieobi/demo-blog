import express, {
    json,
    urlencoded,
    Request,
    Response,
    NextFunction,
  } from "express";
  import logger from "morgan";
  import cors from "cors";
  

  export const app = express();


  app.use(cors());
  app.use(logger("dev"));
  app.use(json());
  app.use(urlencoded({ extended: false }));
  

  // const dev = "http://localhost:5000/api/v1";
  // const auth = `Bearer token`
  