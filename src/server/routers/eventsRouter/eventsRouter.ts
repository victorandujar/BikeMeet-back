import { Router } from "express";
import {
  deleteEvents,
  getAllEvents,
  getUserEvents,
} from "../../controllers/eventsControllers/eventsControllers.js";
import auth from "../../middlewares/auth/auth.js";

const getEventsRoute = "/";
const getUserEventsRoute = "/my-events";
const deleteEventRoute = "/delete/:idEvent";

const eventsRouter = Router();

eventsRouter.get(getEventsRoute, getAllEvents);
eventsRouter.get(getUserEventsRoute, auth, getUserEvents);
eventsRouter.delete(deleteEventRoute, auth, deleteEvents);

export default eventsRouter;
