import { type Request, type NextFunction, type Response } from "express";
import mongoose from "mongoose";
import { CustomError } from "../../../CustomError/CustomError";
import { type CustomRequest } from "../../../types/users/types";
import auth from "./auth";
import jwt from "jsonwebtoken";

const req: Partial<Request> = {};

const next: NextFunction = jest.fn();
const res: Partial<Response> = {};

describe("Given an auth middleware", () => {
  describe("When it receives a request without an authorization header", () => {
    test("Then it should invoke next with and error status 401 and message 'Missing token'", () => {
      const req: Partial<CustomRequest> = {
        header: jest.fn().mockReturnValue(undefined),
      };
      const expectedStatus = 401;
      const expectedError = new CustomError(
        "Authorization header missing",
        expectedStatus,
        "Missing token"
      );

      jwt.verify = jest.fn().mockReturnValueOnce({});

      auth(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request without an authorization header that begins with 'Bearer '", () => {
    test("Then it should invoke next with and error status 401 and message 'Missing bearer in Authorization header'", () => {
      const req: Partial<CustomRequest> = {
        header: jest.fn().mockReturnValue("123456"),
      };
      const expectedStatus = 401;
      const expectedError = new CustomError(
        "Missing bearer in Authorization header",
        expectedStatus,
        "Missing token"
      );
      jwt.verify = jest.fn().mockReturnValueOnce({});

      auth(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request with an authorization header 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pcmVpYTQiLCJpZCI6IjYzNmZjMzZjY2IxMDFhM2NkNGJlZGQ4YSIsImlhdCI6MTY2ODI2OTE3OSwiZXhwIjoxNjY4NDQxOTc5fQ.n1WpQo6lzeGiJpfngUzr86iO55218EvdpUAIRSThbUE'", () => {
    test("Then it should add the postedBy property and the token to the request and invoke next", () => {
      const req: Partial<Request> = {};
      req.header = jest
        .fn()
        .mockReturnValueOnce(
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pcmVpYTQiLCJpZCI6IjYzNmZjMzZjY2IxMDFhM2NkNGJlZGQ4YSIsImlhdCI6MTY2ODI2OTE3OSwiZXhwIjoxNjY4NDQxOTc5fQ.n1WpQo6lzeGiJpfngUzr86iO55218EvdpUAIRSThbUE"
        );
      const postedBy = new mongoose.Types.ObjectId();
      jwt.verify = jest.fn().mockReturnValueOnce({ sub: postedBy });

      auth(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalled();
      expect(req).toHaveProperty("postedBy", postedBy);
    });
  });

  describe("When it receives a request with an undefined token'", () => {
    test("Then it should add the userId property and the token to the request and invoke next", () => {
      const req: Partial<Request> = {};

      const postedBy = new mongoose.Types.ObjectId();
      jwt.verify = jest.fn().mockReturnValueOnce({ sub: postedBy });

      auth(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
