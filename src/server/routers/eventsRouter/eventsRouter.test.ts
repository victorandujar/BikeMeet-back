import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../..";
import connectDataBase from "../../../database/connectDataBase";
import { Event } from "../../../database/models/Events/Events";
import { type EventData } from "../../../types/events/types";

let mongodbServer: MongoMemoryServer;

beforeAll(async () => {
  mongodbServer = await MongoMemoryServer.create();
  const mongodbServerUrl = mongodbServer.getUri();

  await connectDataBase(mongodbServerUrl);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongodbServer.stop();
});

afterEach(async () => {
  await Event.deleteMany();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Given a GET '/events' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status 200", async () => {
      const expectedStatus = 200;
      const eventsUrl = "/events/events";

      await request(app).get(eventsUrl).expect(expectedStatus);
    });
  });
});
