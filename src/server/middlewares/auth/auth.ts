import { type Response, type NextFunction } from "express";
import { CustomError } from "../../../CustomError/CustomError.js";
import {
  type CustomJwtPayload,
  type CustomRequest,
} from "../../../types/users/types";
import jwt from "jsonwebtoken";

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader) {
      throw new Error("Authorization header missing");
    }

    if (!authorizationHeader.startsWith("Bearer ")) {
      throw new Error("Missing bearer in Authorization header");
    }

    const token = authorizationHeader.replace(/^Bearer\s*/, "");

    const { sub: postedBy } = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as CustomJwtPayload;

    req.userId = postedBy;

    next();
  } catch (error: unknown) {
    const tokenError = new CustomError(
      (error as Error).message,
      401,
      "Invalid token"
    );
    next(tokenError);
  }
};

export default auth;
