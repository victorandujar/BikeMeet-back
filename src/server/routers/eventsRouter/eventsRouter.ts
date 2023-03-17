import { Router } from "express";
import {
  createEvent,
  deleteEvents,
  getAllEvents,
  getUserEvents,
} from "../../controllers/eventsControllers/eventsControllers.js";
import multer from "multer";
import auth from "../../middlewares/auth/auth.js";
import crypto from "crypto";
import path from "path";
import supaBase from "../../middlewares/supaBase/supaBase.js";
import { validate } from "express-validation";
import eventsSchema from "../../schemas/eventsSchemas/eventsSchema.js";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename(req, file, callBack) {
    const suffix = crypto.randomUUID();

    const extension = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extension);

    const filename = `${basename}-${suffix}${extension}`;

    callBack(null, filename);
  },
});

const upload = multer({ storage });

const getEventsRoute = "/";
const getUserEventsRoute = "/my-events";
const deleteEventRoute = "/delete/:idEvent";
const createEventRoute = "/create";

const eventsRouter = Router();

eventsRouter.get(getEventsRoute, getAllEvents);
eventsRouter.get(getUserEventsRoute, auth, getUserEvents);
eventsRouter.delete(deleteEventRoute, auth, deleteEvents);
eventsRouter.post(
  createEventRoute,
  auth,
  upload.single("image"),
  validate(eventsSchema, {}, { abortEarly: false }),
  supaBase,
  createEvent
);

export default eventsRouter;
