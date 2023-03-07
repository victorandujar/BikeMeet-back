import { type JwtPayload } from "jsonwebtoken";

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserData extends UserCredentials {
  name: string;
}

export interface CustomJwtPayload extends JwtPayload {
  email: string;
  sub: string;
}
