import { type JwtPayload } from "jsonwebtoken";
import { type Request } from "express";
import type * as core from "express-serve-static-core";

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserData extends UserCredentials {
  name: string;
}

export interface UserRegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface CustomJwtPayload extends JwtPayload {
  sub: string;
}

export interface CustomRequest<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any
> extends Request<P, ResBody, ReqBody> {
  userId: string;
}
