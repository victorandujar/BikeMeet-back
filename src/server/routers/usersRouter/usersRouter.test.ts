import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectDataBase from "../../../database/connectDataBase";
import { User } from "../../../database/models/Users/User";
import bcryptjs from "bcryptjs";
import { app } from "../../index.js";
import request from "supertest";
import {
  type UserRegisterCredentials,
  type UserCredentials,
  type UserData,
} from "../../../types/users/types";
import jwt from "jsonwebtoken";

let mongodbServer: MongoMemoryServer;

beforeAll(async () => {
  mongodbServer = await MongoMemoryServer.create();
  const mongoServerUrl = mongodbServer.getUri();

  await connectDataBase(mongoServerUrl);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongodbServer.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

const mockUserDb: UserData = {
  email: "jordi@gmail.com",
  password: "12345678",
  name: "jordi",
};

describe("Given a POST '/users/login' endpoint", () => {
  const user: UserCredentials = {
    email: "jordi@gmail.com",
    password: "12345678",
  };
  const loginPath = "/users/login";

  describe("When it receives a request with an email 'jordi@gmail.com' and a password '12345678'", () => {
    test("Then it should respond with status 200 and an object in its body with the property 'token'", async () => {
      jwt.sign = jest.fn().mockImplementation(() => ({
        token: "asdfasdfasdfgsadf3242345",
      }));
      const expectedStatus = 200;
      const hashedPassword = await bcryptjs.hash(user.password, 10);

      await User.create({
        ...mockUserDb,
        password: hashedPassword,
      });

      const response = await request(app)
        .post(loginPath)
        .send(user)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("token");
    });
  });
});

describe("Given a POST /users/register endpoint", () => {
  describe("When it receives a request to register a user properly", () => {
    beforeEach(async () => {
      await User.deleteMany();
    });
    test("Then it should respond with a message 'The user hase been created'", async () => {
      const newUser: UserRegisterCredentials = {
        email: "victor@andujar.org",
        password: "12345678",
        name: "victor",
      };
      const registerPath = "/users/register";

      const expectedStatus = 201;

      const response = await request(app)
        .post(registerPath)
        .send(newUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("message");
    });
  });
});
