import { type NextFunction, type Response } from "express";
import { CustomError } from "../../../../CustomError/CustomError.js";
import { type EventData } from "../../../../types/events/types.js";
import { type CustomRequest } from "../../../../types/users/types";
import optimizing from "./optimizing.js";

beforeEach(() => jest.clearAllMocks());

let mockImageFile = jest.fn();

const mockEvent: EventData = {
  date: "27/03/23",
  description: "sfdkjlkdsf",
  distance: 123,
  id: "121332432543",
  image: "mussara.jpg",
  name: "mussara",
  postedBy: "2398213djskal",
  type: "Gravel",
};

jest.mock("sharp", () => () => ({
  resize: jest.fn().mockReturnValue({
    webp: jest.fn().mockReturnValue({
      toFormat: jest.fn().mockReturnValue({ toFile: mockImageFile }),
    }),
  }),
}));

const next = jest.fn() as NextFunction;

const res: Partial<Response> = {};

const file: Partial<Express.Multer.File> = {
  filename: "mussara",
  originalname: "mussara.jpg",
};

const req: Partial<CustomRequest> = {
  body: mockEvent,
};

describe("Given an optimizing middleware", () => {
  describe("When it receives a request with an image", () => {
    test("Then it should call its next method and put the optimized image to the request", async () => {
      const expectedImageName = "mussara.webp";
      req.file = file as Express.Multer.File;

      await optimizing(req as CustomRequest, res as Response, next);

      expect(req.file.filename).toBe(expectedImageName);
    });
  });

  describe("When it receives a request without an image", () => {
    test("Then it should call its next method with an error", async () => {
      const newError = new CustomError(
        "Error optimizing the provided image",
        400,
        "Error optimizing the provided image"
      );

      mockImageFile = jest.fn().mockRejectedValue(undefined);

      await optimizing(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(newError);
    });
  });
});
