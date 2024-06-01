import express, {
  json,
  urlencoded,
  Request,
  Response,
  NextFunction,
} from "express";
import logger from "morgan";
import cors from "cors";
import { AppError } from "../../utils";
import { AppRes } from "./helpers";

export const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  try {
    const result = AppError.handler(err);
    const response: AppRes = {
      status: false,
      message: result.message ?? "Internal Server Error",
      data: result.details?.data ?? null,
    };
    res.status(result.details?.code ?? 500).send(response);
    console.log(err);
  } catch (error) {
    next(error);
  }
});

// const dev = "http://localhost:5000/api/v1";
// const auth = `Bearer token`
