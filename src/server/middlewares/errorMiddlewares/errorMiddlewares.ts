import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError.js";
import createDebug from "debug";

const debug = createDebug("bikemeet:server:middlewares:errorMiddlewares");
const notFoundStatusCode = 404;
const generalErrorStatusCodeDefault = 500;
const publicMessageDefault = "Something went wrong";

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError(
    "Path not found",
    notFoundStatusCode,
    "Endpoint not found"
  );

  next(error);
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(error.message);

  const statusCode = error.statusCode || generalErrorStatusCodeDefault;
  const publicMessage = error.publicMessage || publicMessageDefault;

  res.status(statusCode).json({ error: publicMessage });
};
