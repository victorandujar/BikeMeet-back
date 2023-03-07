import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError";
import createDebug from "debug";

const debug = createDebug("bikemeet:server:middlewares:errorMiddlewares");
const notFoundStatusCode = 404;
const generalErrorStatusCode = 500;
const publicMessageText = "Something went wrong";

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

  const statusCode = error.statusCode || generalErrorStatusCode;
  const publicMessage = error.publicMessage || publicMessageText;

  res.status(statusCode).json({ error: publicMessage });
};
