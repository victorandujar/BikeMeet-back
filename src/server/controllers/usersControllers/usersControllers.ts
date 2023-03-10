import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError.js";
import { User } from "../../../database/models/User.js";
import {
  type UserRegisterCredentials,
  type CustomJwtPayload,
  type UserCredentials,
} from "../../../types/types";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const requestSucceedStatus = 200;
const hashingPasswordLength = 8;

export const loginUser = async (
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

    if (!user) {
      const customError = new CustomError(
        "Wrong credentials",
        401,
        "Wrong credentials"
      );

      next(customError);
      return;
    }

    const passwordConfirmation = await bcryptjs.compare(
      password,
      user.password
    );

    if (!passwordConfirmation) {
      const customError = new CustomError(
        "Wrong credentials",
        401,
        "Wrong credentials"
      );

      next(customError);
      return;
    }

    const jwtPayload: CustomJwtPayload = {
      sub: user._id.toString(),
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

export const registerUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserRegisterCredentials
  >,
  res: Response,
  next: NextFunction
) => {
  const { email, name, password } = req.body;

  try {
    const hashedPassword = await bcryptjs.hash(password, hashingPasswordLength);

    await User.create({
      email,
      name,
      password: hashedPassword,
    });

    res.status(201).json({ message: "The user has been created" });
  } catch (error) {
    const customError = new CustomError(
      "The user couldn't be created.",
      409,
      "There was a problem creating the user."
    );

    next(customError);
  }
};
