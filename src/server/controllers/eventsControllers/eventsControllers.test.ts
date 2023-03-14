import { type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError";
import { Event } from "../../../database/models/Events/Events";
import { type EventsData, type EventData } from "../../../types/events/types";
import { type CustomRequest } from "../../../types/users/types";
import { getAllEvents, getUserEvents } from "./eventsControllers";

const mockEventGravel: EventData = {
  name: "Sa costa",
  date: new Date(),
  description: "asdjklksadhdashdjk",
  distance: 123,
  image: "sacosta.png",
  type: "Gravel",
  id: "",
  postedBy: "",
};

const mockEventRoad: EventData = {
  name: "Sa costa",
  date: new Date(),
  description: "asdjklksadhdashdjk",
  distance: 123,
  image: "sacosta.png",
  type: "Road",
  id: "",
  postedBy: "",
};

const mockEventsList: EventsData = [mockEventGravel, mockEventRoad];

beforeEach(() => jest.restoreAllMocks());

describe("Given getEvents controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its status method with 200", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockEventsList),
      };
      const req: Partial<Request> = {};
      const next = jest.fn();
      const expectedStatusCode = 200;

      Event.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockEventsList),
      }));

      await getAllEvents(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockEventsList),
      };
      const req: Partial<Request> = {};
      const next = jest.fn();

      Event.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockEventsList),
      }));

      await getAllEvents(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ events: mockEventsList });
    });
  });

  describe("When it receives a bad request", () => {
    test("Then it should call its next function", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({}),
      };
      const req: Partial<Request> = {};
      const next = jest.fn();

      const expectedError = new CustomError(
        "Bad request",
        400,
        "Couldn't retrieve bike events"
      );

      req.body = {};

      Event.find = jest.fn().mockReturnValue(undefined);

      await getAllEvents(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given the getUserEvents controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its status method with 200", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockEventsList),
      };
      const req: Partial<Request> = {};
      const next = jest.fn();
      const expectedStatusCode = 200;
      req.body = { postedBy: "213i21309213891jkdk" };

      Event.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue({ postedBy: "12324324fdsvsdafsg45" }),
      }));

      await getUserEvents(req as CustomRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockEventsList),
      };
      const req: Partial<Request> = {};
      const next = jest.fn();
      req.params = { postedBy: "213i21309213891jkdk" };

      Event.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockEventsList),
      }));

      await getUserEvents(req as CustomRequest, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ events: mockEventsList });
    });
  });

  describe("When it receives a bad request", () => {
    test("Then it should call its next function", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({}),
      };
      const req: Partial<Request> = {};
      const next = jest.fn();

      const expectedError = new CustomError(
        "Bad request",
        400,
        "Couldn't retrieve bike events"
      );

      req.body = {};

      Event.find = jest.fn().mockReturnValue(undefined);

      await getUserEvents(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
