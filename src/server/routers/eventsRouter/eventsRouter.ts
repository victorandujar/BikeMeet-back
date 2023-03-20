import { Router } from "express";
import {
  createEvent,
  deleteEvents,
  findEvent,
  getAllEvents,
  getUserEvents,
} from "../../controllers/eventsControllers/eventsControllers.js";
import multer from "multer";
import auth from "../../middlewares/auth/auth.js";
import crypto from "crypto";
import path from "path";
import supaBase from "../../middlewares/images/supaBase/supaBase.js";
import { validate } from "express-validation";
import eventsSchema from "../../schemas/eventsSchemas/eventsSchema.js";
import optimizing from "../../middlewares/images/optimizing/optimizing.js";

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

const upload = multer({ storage, limits: { fileSize: 10000000 } });

const getEventsRoute = "/";
const getUserEventsRoute = "/my-events";
const deleteEventRoute = "/delete/:idEvent";
const createEventRoute = "/create";
const findByIdRoute = "/detail/:idEvent";

const eventsRouter = Router();

eventsRouter.get(getEventsRoute, getAllEvents);
eventsRouter.get(getUserEventsRoute, auth, getUserEvents);
eventsRouter.delete(deleteEventRoute, auth, deleteEvents);
eventsRouter.post(
  createEventRoute,
  auth,
  upload.single("image"),
  validate(eventsSchema, {}, { abortEarly: false }),
  optimizing,
  supaBase,
  createEvent
);
eventsRouter.get(findByIdRoute, auth, findEvent);

export default eventsRouter;
