import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../..";
import connectDataBase from "../../../database/connectDataBase";
import { Event } from "../../../database/models/Events/Events";
import { type EventData } from "../../../types/events/types";
import crypto from "crypto";
import jwt from "jsonwebtoken";

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

const mockEventRoad: EventData = {
  name: "Sa costa",
  date: new Date(),
  description: "asdjklksadhdashdjk",
  distance: 123,
  image: "3 nacions-3d60ef19-09fc-41ee-bf51-fa462a7e5ef9.jpg",
  type: "Road",
  postedBy: "63fb73bab16d839d41bec0c5",
  id: "",
};

describe("Given a GET '/events' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status 200", async () => {
      const expectedStatus = 200;
      const eventsUrl = "/events";

      await request(app).get(eventsUrl).expect(expectedStatus);
    });
  });
});

describe("Given a POST '/create' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status 201", async () => {
      const urlCreate = "/events/create";
      const expectedStatus = 201;

      const expectedResponseBody = mockEventRoad;

      const userId = new mongoose.Types.ObjectId();
      jwt.verify = jest.fn().mockReturnValue({ sub: userId });

      const response: { body: { event: EventData } } = await request(app)
        .post(urlCreate)
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2ZiNzNiYWIxNmQ4MzlkNDFiZWMwYzUiLCJlbWFpbCI6ImpvcmRpQGdtYWlsLmNvbSIsImlhdCI6MTY3ODk5Mjc5MSwiZXhwIjoxNjc5MTY1NTkxfQ.yMrSvMa-aN0kozxfKLPBQXO9HfXXa1af7PlZkb71RAE"
        )
        .set("content-type", "multipart/form-data")
        .field("name", mockEventRoad.name)
        .field("date", mockEventRoad.date.toString())
        .field("description", mockEventRoad.description)
        .field("distance", mockEventRoad.distance)
        .field("type", mockEventRoad.type)
        .attach("image", Buffer.from("uploads"), {
          filename: "3 nacions-3d60ef19-09fc-41ee-bf51-fa462a7e5ef9.jpg",
        })
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("event");
    });
  });
});
