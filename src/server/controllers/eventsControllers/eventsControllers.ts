import { type NextFunction, type Request, type Response } from "express";
import mongoose from "mongoose";
import { CustomError } from "../../../CustomError/CustomError.js";
import { Event } from "../../../database/models/Events/Events.js";
import { type EventStructure } from "../../../types/events/types.js";
import { type CustomRequest } from "../../../types/users/types.js";

export const getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await Event.find().exec();

    res.status(200).json({ events });
  } catch (error) {
    const customError = new CustomError(
      "Bad request",
      400,
      "Couldn't retrieve bike events."
    );

    next(customError);
  }
};

export const getUserEvents = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await Event.find({ postedBy: req.userId }).exec();

    res.status(200).json({ events });
  } catch (error) {
    const customError = new CustomError(
      "Bad request",
      400,
      "Couldn't retrieve bike events."
    );

    next(customError);
  }
};

export const deleteEvents = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { idEvent } = req.params;
  try {
    const event = await Event.findByIdAndDelete({
      _id: idEvent,
      postedBy: req.userId,
    }).exec();

    res.status(200).json({ event });
  } catch (error) {
    const customError = new CustomError(
      "Internal Server Error. Sorry something went wrong.",
      500,
      "The event couldn't be deleted."
    );

    next(customError);
  }
};

export const createEvent = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { date, description, distance, image, name, type } =
    req.body as EventStructure;
  const { userId } = req;
  try {
    const newEvent: EventStructure = {
      date,
      description,
      distance,
      image,
      name,
      type,
      postedBy: new mongoose.Types.ObjectId(userId),
    };

    const createdEvent = await Event.create(newEvent);

    res.status(201).json({ event: createdEvent });
  } catch (error) {
    const customError = new CustomError(
      "Couldn't create the event.",
      400,
      "Couldn't create the event."
    );

    next(customError);
  }
};

export const findEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idEvent } = req.params;

  try {
    const eventById = await Event.findById({ _id: idEvent }).exec();

    res.status(200).json({ event: eventById });
  } catch (error) {
    const customError = new CustomError(
      "Couldn't find any event to load.",
      400,
      "Couldn't find any event to load."
    );

    next(customError);
  }
};
