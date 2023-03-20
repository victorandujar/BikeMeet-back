import { type NextFunction, type Response } from "express";
import { Event } from "../../../../database/models/Events/Events";
import { type CustomRequest } from "../../../../types/users/types";
import fs from "fs/promises";
import supaBase, { supabase } from "./supaBase";

afterEach(async () => {
  jest.clearAllMocks();
});

const file: Partial<Express.Multer.File> = { filename: "event.jpg" };
const mockEvent = new Event();

const req: Partial<CustomRequest> = {
  body: mockEvent,
  file: file as Express.Multer.File,
};
const res: Partial<Response> = {};

const next: NextFunction = jest.fn();

const mockImagePath = "uploads/event.jpg";

describe("Given a supaBase middleware function", () => {
  describe("When it receives a request with a file", () => {
    test("Then it should rename the file, upload it to supabase and invoque next", async () => {
      fs.readFile = jest.fn().mockResolvedValueOnce(mockImagePath);

      supabase.storage.from("images").upload = jest.fn();

      supabase.storage.from("images").getPublicUrl = jest
        .fn()
        .mockReturnValueOnce({ data: { pulicUrl: mockImagePath } });

      await supaBase(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it is called with an invalid request", () => {
    test("Then it should catch the error and call next", async () => {
      const req: Partial<CustomRequest> = {};

      await supaBase(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
