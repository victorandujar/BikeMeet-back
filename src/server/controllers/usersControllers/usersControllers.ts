import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError.js";
import { User } from "../../../database/models/User.js";
import {
  type CustomJwtPayload,
  type UserCredentials,
} from "../../../types/types";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const requestSucceedStatus = 200;

const loginUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserCredentials
  >,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    const passwordConfirmation = await bcryptjs.compare(
      password,
      user!.password
    );

    if (!user || !passwordConfirmation) {
      const error = new CustomError(
        "Wrong credentials",
        401,
        "Wrong credentials"
      );

      next(error);
    }

    const jwtPayload: CustomJwtPayload = {
      sub: user!._id.toString(),
      email,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
      expiresIn: "2d",
    });

    res.status(requestSucceedStatus).json({ token });
  } catch (error) {
    next(error);
  }
};

export default loginUser;
