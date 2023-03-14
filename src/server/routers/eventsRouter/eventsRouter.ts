import { Router } from "express";
import {
  getAllEvents,
  getUserEvents,
} from "../../controllers/eventsControllers/eventsControllers.js";

const getEventsRoute = "/";
const getUserEventsRoute = "/my-events";

const eventsRouter = Router();

eventsRouter.get(getEventsRoute, getAllEvents);
eventsRouter.get(getUserEventsRoute, getUserEvents);

export default eventsRouter;
