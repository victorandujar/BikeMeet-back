import { type JwtPayload } from "jsonwebtoken";
import { type Request } from "express";

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

export interface CustomRequest extends Request {
  postedBy: string;
}
