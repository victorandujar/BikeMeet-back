import { type JwtPayload } from "jsonwebtoken";

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
  email: string;
  sub: string;
}

export interface UserId extends Request {
  postedBy: string;
}
