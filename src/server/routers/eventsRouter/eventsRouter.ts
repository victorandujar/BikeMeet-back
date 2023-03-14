import { Router } from "express";
import {
  getAllEvents,
  getUserEvents,
} from "../../controllers/eventsControllers/eventsControllers.js";
import auth from "../../middlewares/auth/auth.js";

const getEventsRoute = "/";
const getUserEventsRoute = "/my-events";

const eventsRouter = Router();

eventsRouter.get(getEventsRoute, getAllEvents);
eventsRouter.get(getUserEventsRoute, auth, getUserEvents);

export default eventsRouter;
