import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError.js";
import { Event } from "../../../database/models/Events/Events.js";
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
      "Couldn't retrieve bike events"
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
    const events = await Event.find({ postedBy: req.postedBy }).exec();

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
      postedBy: req.postedBy,
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
